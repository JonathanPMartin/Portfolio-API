const db = require('../helpers/database');
exports.add=async function add(currency,amount,currDate){
	let query="insert INTO GBPConvert(currency,amount,currDate) values(?,?,?)"
	let values=[currency,amount,currDate];
	let data = await db.run_query(query, values);
  return data;
}
exports.get=async function get(currDate){
	let query="select * from GBPConvert where currDate=?"
	let values=[currDate];
	let data = await db.run_query(query, values);
  return data;
}
/*
currency varchar(255) NOT NULL,
	amount float(255,2) NOT NULL,
	currDate DATE not Null,
*/