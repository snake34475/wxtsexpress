import { WeChat, ApiConfigKit, ApiConfig } from "tnwx";
let devApiConfig = new ApiConfig(
  "wx418aac4439e8bfa5",
  "2ecdd3288a2cf127f370b479b63afcd8",
  "Javen",
  false
);

// 微信公众号、微信小程序、微信小游戏 支持多应用
ApiConfigKit.putApiConfig(devApiConfig);
// 开启开发模式,方便调试
ApiConfigKit.devMode = true;
// 设置当前应用
ApiConfigKit.setCurrentAppId(devApiConfig.getAppId);

function checkSignature(req: any, res: any) {
  console.log("get query...", req.query);

  let appId: string = req.query.appId;
  if (appId) {
    ApiConfigKit.setCurrentAppId(appId);
  }

  let signature = req.query.signature, //微信加密签名
    timestamp = req.query.timestamp, //时间戳
    nonce = req.query.nonce, //随机数
    echostr = req.query.echostr; //随机字符串
  res.send(WeChat.checkSignature(signature, timestamp, nonce, echostr));
}

//发送消息
function handleMessage(req: any, res: any) {
  console.log("post...", req.query);
  // 支持多公众号
  let appId: string = req.query.appId;
  if (appId) {
    ApiConfigKit.setCurrentAppId(appId);
  }
  // 获取签名相关的参数用于消息解密(测试号以及明文模式无此参数)
  let msgSignature = req.query.msg_signature,
    timestamp = req.query.timestamp,
    nonce = req.query.nonce;

  //监听 data 事件 用于接收数据
  let buffer: Uint8Array[] = [];
  req.on("data", function (data: any) {
    buffer.push(data);
  });

  req.on("end", function () {
    let msgXml = Buffer.concat(buffer).toString("utf-8");
    console.log("msgXml",msgXml)
    // 处理消息并响应对应的回复
    // ....
  });
}

module.exports = {
  checkSignature,
  handleMessage,
};
