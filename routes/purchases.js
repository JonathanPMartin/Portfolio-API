const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/purchases');
const model2= require('../models/portfolio')
const router = Router({prefix: '/api/v1/purchases'});
const auth = require('../controllers/auth');
const clean=require('../controllers/clean')
router.post('/',bodyParser(),auth, Add);
router.get('/port/:id([0-9]{1,})',auth,GetByID);
router.put('/:id([0-9]{1,})',auth,bodyParser(),Update);
router.del('/:id([0-9]{1,})',auth,Delete)
router.del('/port/:id([0-9]{1,})',auth,DeleteByPort)
async function Add(ctx){
	let body=ctx.request.body;
	const user = ctx.state.user;
	let data=body.currency+String(body.amount)+body.DoP+String(body.portid)
	let Isclean=await clean.clean(data);
	if(Isclean){
	let portfolio=await model2.get(body.portid);
	let userid=portfolio[0].UserId;
	if(userid==user.id || user.UserRole=='admin'){
			let Norm=true;
			if(typeof(body.currency)!="string"){
				Norm=false
			}else if(typeof(body.portid)!="number"){
				Norm=false
			}else if(typeof(body.amount)!="number"){
				Norm=false
			}else if(typeof(body.DoP)!="string"){
				Norm=false
			}
		if(Norm){
	let purchase=await model.add(body.currency,body.amount,body.DoP,body.portid)
	//console.log(user);
	if (purchase != null){
		console.log(ctx.status)
		ctx.status = 201;
		console.log(ctx.status)
	}
		}else{
				ctx.body ="One Or More inputs were in an unexpected type";
			ctx.status=400;
		}
}else{
	ctx.status = 401;
}
}else{
	ctx.status = 401;
}
}
async function GetByID(ctx){
	let portid = ctx.params.id;
	let portfolio=await model2.get(portid);
	let userid=portfolio[0].UserId;
	const user = ctx.state.user;
	//console.log(user);
	if(userid==user.id || user.UserRole=='admin'){
		ctx.body=await model.getbyportid(portid)
		ctx.status=200;
	}else{
		ctx.status=401;
	}
}
async function Update(ctx){
	let id = ctx.params.id;
	let body=ctx.request.body;
	console.log(body);
	const user = ctx.state.user;
	let data=body.currency+String(body.amount)+body.DoP
	let Isclean=await clean.clean(data);
	if(Isclean){
		let portfolio=await model2.get(body.portid);
		let userid=portfolio[0].UserId;
		if(userid==user.id || user.UserRole=='admin'){
				let Norm=true;
			if(typeof(body.currency)!="string"){
				Norm=false
				console.log('cur')
			}else if(typeof(id)!="string"){
				Norm=false
				console.log('id')
			}else if(typeof(body.amount)!="number"){
				Norm=false
				console.log('amount')
			}else if(typeof(body.DoP)!="string"){
				Norm=false
				console.log('DoP')
			}
			if(Norm){
			let result=await model.UpdatePur(body.currency,body.amount,body.DoP,id)
			ctx.body=result
			ctx.status=200
			}
			else{
				ctx.body ="One Or More inputs were in an unexpected type";
			ctx.status=400;
			}
		}else{
			ctx.status=401;
		}
	}else{
		ctx.status=401;
	}

}
async function Delete(ctx){
	let id = ctx.params.id;
	let purchase=await model.GetById(id);
	let portfolio=await model2.get(purchase[0].portid);
	let userid=portfolio[0].UserId;
	const user = ctx.state.user;
	if(userid==user.id || user.UserRole=='admin'){
		var result=await model.deletePur(id)
		ctx.body=result;
		ctx.status=200;
	}else{
		ctx.status=401
	}
	
}
async function DeleteByPort(ctx){
	let id = ctx.params.id;
	let purchase=await model.GetById(id);
	let portfolio=await model2.get(purchase[0].portid);
	let userid=portfolio[0].UserId;
	const user = ctx.state.user;
	if(userid==user.id || user.UserRole=='admin'){
		var result=await model.deletePurByPortId(id)
		ctx.body=result;
		ctx.status=200;
	}else{
		ctx.status=401
	}
	
}
module.exports = router;