const db = require('../helpers/database');

//get a single article by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM articles WHERE ID = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

//list all the articles in the database
exports.getAll = async function getAll (page, limit, order) {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM articles;";
  let data = await db.run_query(query);
  return data;
}

exports.Update=async function Update(id,article){
  
  let query ="UPDATE articles  SET title =?, allText=? WHERE ID = ?";

  let values=[article.title,article.allText,id];
  let data = await db.run_query(query, values);
  return data;
}
//create a new article in the database
exports.add = async function add (article) {
  let query = "INSERT INTO articles SET ?";
  let data = await db.run_query(query, article);
  return data;
}
