const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/portfolio');
const auth = require('../controllers/auth');
const router = Router({prefix: '/api/v1/portfolio'});
const clean=require('../controllers/clean')
router.post('/',bodyParser(),auth, Add);
async function Add(ctx){
	const user = ctx.state.user;
	let body=ctx.request.body;
	var data=body.Name+String(body.UserId)
	let Isclean=await clean.clean(data);
	if(Isclean){
	if(body.UserId==user.id || user.role=='admin'){
	let port=await model.add(body.Name,body.UserId)
	//console.log(port);
	if (port != null){

		console.log(ctx.status)
		ctx.status = 201;
		console.log(ctx.status)
	}
}else{
	ctx.status=401;
}
}else{
	ctx.status=401;
}
}

module.exports = router;