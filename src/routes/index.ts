// src/routes/index.ts

import { Express, Request, Response, Router } from 'express'
import {checkSignature, handleMessage} from "../utils"
// 路由配置接口
interface RouterConf {
  path: string,
  router: Router,
  meta?: unknow
}

// 路由配置
const routerConf: Array<RouterConf> = []

function routes(app: Express) {
  // 根目录
  app.get('/', (req: Request, res: Response) => res.status(200).send('Hello Shinp!!!'))

  app.get('/checkSignature', checkSignature)

  app.post('/msg', handleMessage)

  routerConf.forEach((conf) => app.use(conf.path, conf.router))
}

export default routes
