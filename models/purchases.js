const db = require('../helpers/database');
exports.add=async function add(Name,amount,DoP,portid){
	let query="insert INTO purchases(currency,amount,DoP,portid) values(?,?,?,?)"
	let values=[Name,amount,DoP,portid];
	let data = await db.run_query(query, values);
  return data;
}
exports.getbyportid=async function getbyportid(PortId){
	let query="select * from purchases where portid =?";
	let values=[PortId];
	let data = await db.run_query(query, values);
  return data;
}
exports.deletePur=async function deletePur(PurId){
		let query="DELETE from purchases where id =?"
	let values=[PurId]
	let data = await db.run_query(query, values);
  return data;
}
exports.deletePurByPortId=async function deletePurByPortId(PortId){
		let query="DELETE from purchases where portid =?"
	let values=[PortId]
	let data = await db.run_query(query, values);
  return data;
}
exports.UpdatePur=async function UpdatePur(currency,amount,DoP,id){
	let query="UPDATE purchases set currency=?, amount=?, DoP=? WHERE id=?";
	let values=[currency,amount,DoP,id]
	let data = await db.run_query(query, values);
  return data;
}
exports.GetById=async function GetById(id){
	let query="select * from purchases where id =?";
	let values=[id]
	let data = await db.run_query(query, values);
	return data;

}