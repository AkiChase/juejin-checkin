import { Page, Response } from "playwright";
import { createTransport } from "nodemailer";
import fs from "fs/promises";
import axios from "axios";
import { constants } from "fs";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loadJsonFile(filePath: string): Promise<any> {
  await fs.access(filePath, constants.F_OK);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function responseHandler(
  response: Response,
  handler: (data: any) => any
) {
  if (response.status() != 200) {
    throw "请求失败, 状态码: " + response.status();
  }
  const res = await response.json();
  if (res?.err_no !== 0) {
    throw res?.err_msg ?? "未知请求错误";
  }
  const data = res?.data ?? {};
  return handler(data);
}

export function waitForResponseHelper(page: Page, url: string) {
  return page.waitForResponse((response) => response.url().startsWith(url), {
    timeout: 10000,
  });
}

export async function emailReport(
  email: string,
  pw: string,
  title: string,
  message: Map<string, string>
) {
  const transporter = createTransport({
    service: "qq",
    auth: {
      user: email,
      pass: pw,
    },
  });

  await transporter.verify();

  const content = Array.from(message.entries())
    .map(([key, value]) => `<p>${key} => ${value}</p>`)
    .join("");

  return await transporter.sendMail({
    from: `掘金签到 <${email}>`,
    to: email,
    subject: title,
    html: content,
  });
}

export async function wxPusherReport(
  sptList: string[],
  title: string,
  message: Map<string, string>
) {
  const content = Array.from(message.entries())
    .map(([key, value]) => `- ${key} => ${value}`)
    .join("\n");

  return await axios.post(
    "https://wxpusher.zjiecode.com/api/send/message/simple-push",
    {
      //推送内容
      content,
      //消息摘要
      summary: title,
      //内容类型，3表示markdown
      contentType: 3,
      //接收方SPT，如果发送给多个用户，不可超过10个
      sptList,
    }
  );
}
