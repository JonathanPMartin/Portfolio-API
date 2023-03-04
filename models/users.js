const db = require('../helpers/database');
const encrypt=require("./encrypt");
exports.Login = async function Login(data){
	console.log('data test')
	console.log(data.username)
	console.log(data.password)
	
	let query="SELECT * FORM users WHERE username =? && password =?";
	let username="alice";
	let password="Test";
	username=data.username;
	password=data.password;
	query="select * from users where username='"+username+"' && "+"password='"+password+"';"
	let values=[username,password];
	let data2=await db.run_query(query);
	return data2
}

exports.findByUsername=async function findByUsername(username){
	let query="Select * from users WHERE username= ?"
	let values = [username];
	let data = await db.run_query(query, values);
  return data;
}
exports.addUser=async function addUser(username,password){
	let query="insert INTO users(username,password) values(?,?)"
	let tem=await encrypt.genSalt(password);
	let values=[username,tem];
	let data = await db.run_query(query, values);
  return data;
} 