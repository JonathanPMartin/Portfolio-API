const { Convert } = require("easy-currencies");
const Router = require('koa-router');
const fetch = require("node-fetch");
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth');
const router = Router({prefix: '/api/v1/Coverter'});
const myHeaders={apikey:"JCzYriT8o5dre6OAQIpAv59sdSvDli65"}
const cashe=require('node-cache');
const model = require('../models/Coverter');
const datacashe=new cashe({stdTTL:86400});
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
//router.get('/',Test)
router.post('/',bodyParser(),CurrentConvert)
router.post('/Date',bodyParser(),HistoricConvert)
router.post('/Change',bodyParser(),ChangeInValue)
router.get('/',GBPCurentConvert)
/*
async function Test(ctx) {
var tem = await Convert(15).from("USD").to("EUR");
ctx.body = tem;
ctx.status = 201;
}
*/
async function GBPCurentConvert(ctx){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today=yyyy+"-"+mm+"-"+dd;
	let value = datacashe.get( today );
	if ( value == undefined ){
			datacashe.set( today, "True" )
			InTable=await model.get(today)
			if(InTable[0]){
				ctx.body=InTable;
				ctx.status=200;

			}
			else{
				var query=`https://api.apilayer.com/exchangerates_data/fluctuation?start_date=${today}&end_date=${today}&base=GBP`
			var Return= await fetch(query, requestOptions) .then(response => response.text())
			var ReturnJson=JSON.parse(Return); 
			var Rates=ReturnJson.rates;
			currency=Object.keys(Rates)
			for(const i in currency){
				var tem=Rates[currency[i]]
				//console.log(tem["start_rate"])
				await model.add(currency[i],tem["start_rate"],today);
			}
			ctx.body = await model.get(today);
			
			
		
			ctx.status=200;
			}
			/*
			// handle miss!
			
			*/
	}else{
		ctx.body=await model.get(today)
		ctx.status=200;
	}
}
async function CurrentConvert(ctx){
	let body= ctx.request.body
	let check=true;
	if(typeof(body.Cur1)!="string"){
		check=false
		console.log('Cur1')
	}else if(typeof(body.Cur2)!="string"){
		check=false
		console.log('Cur2')
	}else if(typeof(body.amount)!="number"){
		check=false
		console.log('Cur3')
	}
	console.log("TEST")
if (check){
var query=`https://api.apilayer.com/exchangerates_data/convert?to=${body.Cur2}&from=${body.Cur1}&amount=${body.amount}`
var Return= await fetch(query, requestOptions) .then(response => response.text())
	ctx.body = Return;
	ctx.status=201;
}else{
	ctx.body ="One Or More inputs were in an unexpected type";
	ctx.status=400;
}
}
async function HistoricConvert(ctx){
	let body= ctx.request.body
	let check=true;
	if(typeof(body.Cur1)!="string"){
		check=false
	}else if(typeof(body.Cur2)!="string"){
		check=false
	}else if(typeof(body.amount)!="number"){
		check=false
	}else if(typeof(body.Date)!="string"){
		check=false
	}
	if (check){
		var query=`https://api.apilayer.com/exchangerates_data/convert?to=${body.Cur2}&from=${body.Cur1}&amount=${body.amount}&date=${body.Date}`
		var Return= await fetch(query, requestOptions) .then(response => response.text())
		ctx.body = Return;
		ctx.status=201;
	}else{
		ctx.body ="One Or More inputs were in an unexpected type";
		ctx.status=400;
	}
}
async function ChangeInValue(ctx){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today=yyyy+"-"+mm+"-"+dd;
	let body= ctx.request.body;
		let check=true;
	if(typeof(body.cur)!="string"){
		check=false
	}else if(typeof(body.date)!="string"){
		check=false
	}
	if (check){
	var query=`https://api.apilayer.com/exchangerates_data/fluctuation?start_date=${body.date}&end_date=${today}&base=${body.cur}`
	var Return= await fetch(query, requestOptions) .then(response => response.text())
	ctx.body = Return;
	ctx.status=201;
	}else{
		ctx.body ="One Or More inputs were in an unexpected type";
		ctx.status=400;
	}
}
/*
fetch("https://api.apilayer.com/exchangerates_data/2020-04-12?symbols=GBP&base=EUR", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); 
*/
module.exports = router;