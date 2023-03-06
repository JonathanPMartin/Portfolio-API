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
exports.deleteUser=async function deleteUser(UserId){
	let query="DELETE from users where id =?"
	let values=[UserId]
	let data = await db.run_query(query, values);
  return data;
}
exports.update=async function update(role,id){
	let query="update users set UserRole =? where id=?"
	let values=[role,id]
	let data = await db.run_query(query, values);
  return data;
}
exports.getAll=async function getAll(){
	let query="select * from users;"
	let data = await db.run_query(query);
  return data;
}