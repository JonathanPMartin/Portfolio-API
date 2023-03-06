const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/users');
const model2=require('../models/encrypt');
//const auth = require('koa-basic-auth');
const auth = require('../controllers/auth');
const clean=require('../controllers/clean')
const router = Router({prefix: '/api/v1/User'});

//router.post('/',bodyParser(), Login);
router.post('/add',bodyParser(), Register);
router.post('/update',bodyParser(),auth, Update);
router.get('/',auth,Getall);
/*
async function Login(ctx) {
	console.log('test')
const body =ctx.request.body;
  let user = await model.Login(body);
	let test=await model2.genSalt('test');
	console.log('return is bellow');
	console.log(test);
  if (user.length) {
    ctx.body = user;
		let tem=ctx.state.user;
		console.log('tem is bellow')
		console.log(tem)
		ctx.status = 201;
  }
}
*/
async function Register(ctx){
	let body=ctx.request.body;
	let data=body.username+body.password
	let Isclean=await clean.clean(data);
	if (Isclean){
	let user=await model.addUser(body.username,body.password)
	console.log(user);
	if (user != null){
		console.log(ctx.status)
		ctx.status = 201;
		console.log(ctx.status)
	}
}else{
	ctx.status = 401;

}
}
async function Update(ctx){
	const user = ctx.state.user;
	let body=ctx.request.body;
	var data=body.UserId+String(body.UserRole)
	let Isclean=await clean.clean(data);
	if(Isclean){
		if(user.UserRole=='admin'){
			var result=await model.update(body.UserId,body.UserRole)
			ctx.body=result;
			ctx.status=201;
		}else{
				ctx.status=401;
		}
	}else{
			ctx.status=401;
	}
}
async function Getall(ctx){
	const user = ctx.state.user;
	if(user.UserRole=='admin'){
		let result=await model.getAll()
		ctx.body=result
		ctx.status=201
	}else{
		ctx.status=401
	}
}
module.exports = router;