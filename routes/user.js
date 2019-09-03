const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    ctx.session.username = data.username
    // console.log('登录后session', ctx.session)
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('账号或密码错误')
})
// router.get('/session-test', async function (ctx, next) {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++
//   ctx.body = {
//     code: 0,
//     viewCount: ctx.session.viewCount
//   }
// })
module.exports = router
