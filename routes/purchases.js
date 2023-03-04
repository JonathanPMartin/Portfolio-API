const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/purchases');
const model2= require('../models/portfolio')
const router = Router({prefix: '/api/v1/purchases'});
const auth = require('../controllers/auth');
const clean=require('../controllers/clean')
router.post('/',bodyParser(),auth, Add);
async function Add(ctx){
	let body=ctx.request.body;
	const user = ctx.state.user;
	data=body.currency+String(body.amount)+body.DoP+String(body.portid)
	let Isclean=await clean.clean(data);
	if(Isclean){
	let portfolio=await model2.get(body.portid);
	let userid=portfolio[0].UserId;
	if(userid==user.id || user.role=='admin'){
	let purchase=await model.add(body.currency,body.amount,body.DoP,body.portid)
	//console.log(user);
	if (purchase != null){
		console.log(ctx.status)
		ctx.status = 201;
		console.log(ctx.status)
	}
}else{
	ctx.status = 401;
}
}else{
	ctx.status = 401;
}
}
module.exports = router;