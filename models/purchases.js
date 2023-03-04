const db = require('../helpers/database');
exports.add=async function add(Name,amount,DoP,portid){
	let query="insert INTO purchases(currency,amount,DoP,portid) values(?,?,?,?)"
	let values=[Name,amount,DoP,portid];
	let data = await db.run_query(query, values);
  return data;
}