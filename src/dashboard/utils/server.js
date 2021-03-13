require('dotenv').config()

const chalk = require('chalk');

const app = require('../app');

let port = process.env.PORT || 3000

app.set('port', port);

let server = app.listen(app.get('port'), function() {
  console.log(`[ ${chalk.green('OK')} ]`, 'Express server listening on http://localhost:' + server.address().port + '/');
});