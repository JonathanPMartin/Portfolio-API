const Koa = require('koa');

const app = new Koa();
console.log('log')
const special = require('./routes/special.js');
//const special = require('./routes/special.js');

const articles = require('./routes/articles.js');

app.use(special.routes());
app.use(articles.routes());

let port = process.env.PORT || 3004;

app.listen(port);

