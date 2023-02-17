const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = Router({prefix: '/api/v1'});
console.log(router.name);
router.get('/', welcomeAPI);

function welcomeAPI(ctx) {
  ctx.body = {
    message: 'Welcome to the blog API'
  }
}

module.exports = router;
