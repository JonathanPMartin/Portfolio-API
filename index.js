const Koa = require('koa');
const app = new Koa();
const special = require('./routes/special.js');
//const special = require('./routes/special.js');

//const articles = require('./routes/articles.js');
const users=require('./routes/users.js')
const portfolios=require('./routes/portfolio.js')
const Coverter=require('./routes/Coverter.js')
const purchases=require('./routes/purchases.js')
app.use(special.routes());
app.use(users.routes());
app.use(Coverter.routes())
app.use(purchases.routes())
app.use(portfolios.routes())
let port = process.env.PORT || 3004;

app.listen(port);

