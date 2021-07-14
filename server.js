const express = require('express');
const bodyParser = require('body-parser'); //needed for req.body parsing

const cors = require('cors');

const port = process.env.PORT || 3000;

const fs = require('fs'); //Added on 20181016 to log using morgan

const routes = require('./src/routes/index');
const parseData = require('./src/routes/parse_data');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //give me json object

app.use(cors());

/*
if (config.app.swagger || true) {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDoc = require('./apiDocumentation.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
*/

/*
Append dao object to all requests
*/
app.use(function(req,res,next){
    return next();
});

// app.post('/login',function(req,res,next){    
//     res.status(200);
//     res.json({
//       success:true,
//       message: 'Token login successful'
//     });});

app.use('/', routes);
app.use('/parse_data', parseData);

//*******************************************************************************************
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Requested page is Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status(500).json({
            message: err.message,
            error: err
        });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json({
          message: err.message,
          error: {}
      });
});

//******************************************************************************************
app.listen(port, ()=>{
  console.log(`... app listening on port.... ${port}`)
});

module.exports = app;