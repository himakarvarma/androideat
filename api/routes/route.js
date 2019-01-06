'use strict';

module.exports = function(app) {
  var controller = require('../controllers/controller.js');

  // routes

  app.route('/')
	.get(controller.defaultroutes);
  app.route('/login')
	.get(controller.login);
  app.route('/register')
	.post(controller.register);

};
