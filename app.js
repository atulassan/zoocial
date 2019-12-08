var session = require('express-session');
var cookieSession = require('cookie-session');
var express = require('express')
var app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
global._ = require('lodash');
global.fetch = require("node-fetch");

app.use(cookieSession({
   name: 'session',
   keys: ['secret'],
   //httpOnly: false,
   // Cookie Options
   maxAge: 1000 * 3600 * 24 * 30 * 2 //1000(milsecs) * 3600(mins) * 24(hours) * 30(days) * 2(months) 
}));

app.use(function (req, res, next) {
   // session id
   if (!req.session.user_uniqid) {
      req.session.user_uniqid = utls.getToken();
   }
   // favourite items
   if (req.session.user_uniqid && !utls.isEmpty(req.session.favitems)) {
      req.session.favitems = [];
   }
   // create cart items
   if (req.session.user_uniqid && !utls.isEmpty(req.session.cartitems)) {
      req.session.cartitems = [];
   }
   next();
});

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */
global.config = require('./config');
global.utls = require('./utils/utils');

var dbOptions = {
   host: config.db.host,
   user: config.db.user,
   password: config.db.password,
   port: config.db.port,
   database: config.db.db,
   charset: config.db.charset
}

//global.conn = mysql.createConnection(dbOptions);

//connect to database
/*conn.connect((err) => {
   if (err) {
      throw err;
   }
   console.log('Mysql Connected...');
});*/

// port number
var port = process.env.PORT || config.server.port;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

var jsondata = { test: "testingnew" };

global.wcapi = new WooCommerceRestApi({
   url: config.wcsettings.url,
   consumerKey: config.wcsettings.consumerKey,
   consumerSecret: config.wcsettings.consumerSecret,
   version: config.wcsettings.version
});

// set the view engine to ejs
//app.use(express.static(__dirname + '../views'));
app.use(express.static(__dirname + '/assets')); //dirname gives the current directory 
app.set('view engine', 'ejs');

/*app.get('/', function (req, res) {

   utls.getCategories((catstatus, catresponse) => {

      //console.log(catresponse);

      if (catstatus) {
         wcapi.get("products", {
            per_page: 20, // 20 products per page
         }).then((result) => {
            res.render("Shop/pages/shop", { products: result.data, categories: catresponse });
         }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
         });
      } else {
         console.log("something went Wrong");
      }
      //console.log(catstatus);
      //console.log(catresponse);
   });
});*/

app.get('/', async function (req, res) {

   console.log(req.session.user_uniqid);
   console.log(req.session.favitems);
   console.log(req.session.cartitems);

   let products = await getWCApiAsync("products");
   let categories = await getWCApiAsync("products/categories");

   data = {
      products: products,
      categories: utls.getNestedChildren(categories, 0)
   }

   res.render("Shop/pages/shop", data);

});

app.get('/search', async function (req, res) {

   let search = req.query.search;

   let products = await getWCApiAsync("products?search=" + search);
   //let products = await getWCApiAsync("products");
   let categories = await getWCApiAsync("products/categories");

   data = {
      products: products,
      categories: utls.getNestedChildren(categories, 0)
   }

   res.render("Shop/pages/search", data);

});

//async function getWCApiAsync(endpoint, data = {}) {
global.getWCApiAsync = async function (endpoint, data = {}) {
   try {
      let items = await wcapi.get(endpoint, data);
      let results = await items;
      return results.data;
   } catch (error) {
      console.log(error);
   }
}

//getUserAsync("products").then(data => console.log(data));
//console.log(utls.check(7, 8));

app.get('/test', async function (req, res) {

   res.setHeader('Content-Type', 'application/json');

   let products = await getWCApiAsync("products");
   let categories = await getWCApiAsync("products/categories");

   console.log(utls.getNestedChildren(categories, 0));

   data = {
      products: products,
      categories: utls.getNestedChildren(categories, 0)
   }

   res.json(data);

});

var apiroutes = require('./routes/index');

app.use(apiroutes);

// Assigning Port
app.listen(port, function () {
   console.log('Server listening on port ' + port + '...');
});
