const db = require('../helpers/database');
exports.add=async function add(Name,UserId){
	let query="insert INTO portfolio(PortName,UserId) values(?,?)"
	let values=[Name,UserId];
	let data = await db.run_query(query, values);
  return data;
}
exports.get=async function get(id){
	let query="select * from portfolio where id =?";
	let values=[id];
	let data = await db.run_query(query, values);
  return data;
}
exports.getbyUser= async function getbyUser(userid){
	let query="select * from portfolio where UserId=?";
	let values=[userid];
	let data = await db.run_query(query, values);
  return data;
}
exports.deletePort=async function deletePort(PortId){
		let query="DELETE from portfolio where id =?"
	let values=[PortId]
	let data = await db.run_query(query, values);
  return data;
}
exports.deletePortByUserId=async function deletePortByUserId(UserId){
		let query="DELETE from portfolio where UserId =?"
	let values=[UserId]
	let data = await db.run_query(query, values);
  return data;
}
exports.update=async function update(name,id){
	let query="update portfolio set PortName=? where id=? "
	let values=[name,id]
	let data = await db.run_query(query, values);
  return data;
}
exports.updateOwner=async function updateOwner(userid,id){
	let query="update portfolio set UserId=? where id=? "
	let values=[userid,id]
	let data = await db.run_query(query, values);
  return data;
}