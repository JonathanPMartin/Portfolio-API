const { Convert } = require("easy-currencies");
const Router = require('koa-router');
const fetch = require("node-fetch");
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth');
const router = Router({prefix: '/api/v1/Coverter'});
const myHeaders={apikey:"JCzYriT8o5dre6OAQIpAv59sdSvDli65"}
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
//router.get('/',Test)
router.post('/',bodyParser(),CurrentConvert)
router.post('/Date',bodyParser(),HistoricConvert)
router.post('/Change',bodyParser(),ChangeInValue)

/*
async function Test(ctx) {
var tem = await Convert(15).from("USD").to("EUR");
ctx.body = tem;
ctx.status = 201;
}
*/
async function CurrentConvert(ctx){
	let body= ctx.request.body
var query=`https://api.apilayer.com/exchangerates_data/convert?to=${body.Cur2}&from=${body.Cur1}&amount=${body.Amount}`
var Return= await fetch(query, requestOptions) .then(response => response.text())
	ctx.body = Return;
	ctx.status=201;
}
async function HistoricConvert(ctx){
	let body= ctx.request.body
	var query=`https://api.apilayer.com/exchangerates_data/convert?to=${body.Cur2}&from=${body.Cur1}&amount=${body.Amount}&date=${body.Date}`
	var Return= await fetch(query, requestOptions) .then(response => response.text())
	ctx.body = Return;
	ctx.status=201;
}
async function ChangeInValue(ctx){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today=yyyy+"-"+mm+"-"+dd;
	let body= ctx.request.body;
	var query=`https://api.apilayer.com/exchangerates_data/fluctuation?start_date=${body.date}&end_date=${today}&base=${body.cur}`
	var Return= await fetch(query, requestOptions) .then(response => response.text())
	ctx.body = Return;
	ctx.status=201;
}
/*
fetch("https://api.apilayer.com/exchangerates_data/2020-04-12?symbols=GBP&base=EUR", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); 
*/
module.exports = router;