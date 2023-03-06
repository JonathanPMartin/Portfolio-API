const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/portfolio');
const auth = require('../controllers/auth');
const router = Router({prefix: '/api/v1/portfolio'});
const clean=require('../controllers/clean')
router.post('/',bodyParser(),auth, Add);
router.post('/:id([0-9]{1,})',bodyParser(),auth, Update);
//bellow thing not reconising link ask sir on wensday prob easy fix
router.post('/Owner:id([0-9]{1,})',bodyParser(),auth, UpdateOwner)
router.get('/',auth,GetUserPorts)
async function Add(ctx){
	const user = ctx.state.user;
	let body=ctx.request.body;
	var data=body.Name+String(body.UserId)
	let Isclean=await clean.clean(data);
	if(Isclean){
	if(body.UserId==user.id || user.UserRole=='admin'){
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
async function GetUserPorts(ctx){
	const user = ctx.state.user;
	var body=await model.getbyUser(user.id);
	ctx.body=body;
	ctx.status=201;

}

async function UpdateOwner(ctx){
	const user = ctx.state.user;
	let id = ctx.params.id;
	let body=ctx.request.body;
	var data=String(body.UserId)
	let Isclean=await clean.clean(data);
	if(Isclean){
		var check=await model.get(id);
		if (check[0].UserId==user.id || user.UserRole=='admin'){
			var result =await model.updateOwner(body.UserId,id);
			ctx.body=result;
			ctx.status=201;
		}else{
			ctx.status=401
		}
	}else{
		ctx.status=401
	}

}

async function Update(ctx){
	const user = ctx.state.user;
	let id = ctx.params.id;
	let body=ctx.request.body;
	var data=body.Name
	let Isclean=await clean.clean(data);
	if(Isclean){
		var check=await model.get(id);
		console.log(check);
		if (check[0].UserId==user.id || user.UserRole=='admin'){
			var result =await model.update(body.Name,id);
			ctx.body=result;
			ctx.status=201;
		}else{
			ctx.status=401
		}
	}else{
		ctx.status=401
	}

}
module.exports = router;