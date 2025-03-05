## 掘金签到

实现了简单的签到加抽奖功能，支持QQ邮箱和WxPusher进行执行结果消息推送

## 配置

在根目录创建 `env.json` 文件，文件内容为

```json
{
  "email": "xxx@qq.com",
  "emailAuth": "xxx",
  "sptList": ["SPT_XXX1", "SPT_XXX2"]
}
```

- email: QQ 邮箱，若为空则不发送 QQ 邮件
- emailAuth: QQ 邮箱授权码
- sptList: WxPusher 的接收方[Spt](https://wxpusher.zjiecode.com/docs/#/?id=%e8%8e%b7%e5%8f%96spt)列表

## 使用

### 安装

请自行确保 node 已正确安装

`pnpm install`

### 运行

终端进入根目录

`pnpm run start`

可以自己使用各种计划任务工具来实现全自动签到
