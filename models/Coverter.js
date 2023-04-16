/**
 * A module used for some converter routes
 * @module models/converter
 * @author Jonathan Martin
 */


const db = require('../helpers/database');
/**
 * adds the rates of diffrent currenices to the database
 * @param {string} currency currency 3 letter code
 * @param {number} amount what it is worth in pounds
 * @param {string} currDate date of the convertsion
 * @returns {object} object containing success message
 */
exports.add=async function add(currency,amount,currDate){
	let query="insert INTO GBPConvert(currency,amount,currDate) values(?,?,?)"
	let values=[currency,amount,currDate];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * gets currenices convertsion by date
 * @param {string} currDate date of the convertsion
 * @returns {object} object containing all currenices and their values in GBD on the date
 */
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