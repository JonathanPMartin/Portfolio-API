const db = require('../helpers/database');
exports.add=async function add(Name,UserId){
	let query="insert INTO portfolio(PortName,UserId) values(?,?)"
	let values=[Name,UserId];
	let data = await db.run_query(query, values);
  return data;
}
exports.get=async function get(id){
	let query="select* from portfolio where id =?";
	let values=[id];
	let data = await db.run_query(query, values);
  return data;
}