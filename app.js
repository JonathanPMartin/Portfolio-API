const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors());
//const special = require('./routes/special.js');
//const special = require('./routes/special.js');

//const articles = require('./routes/articles.js');
const users=require('./routes/users.js')
const portfolios=require('./routes/portfolio.js')
const Coverter=require('./routes/Coverter.js')
const purchases=require('./routes/purchases.js')
//app.use(special.routes());
app.use(users.routes());
app.use(Coverter.routes())
app.use(purchases.routes())
app.use(portfolios.routes())
module.exports = app;

/*let port = process.env.PORT || 3004;

app.listen(port);
*/

