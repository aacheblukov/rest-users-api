'use strict';
module.exports = function(app) {
  const userController = require('../controllers/controller');

  app.route('/:uniqueId/users')
    .get(userController.getAllUsers)
    .post(userController.createUser);


  app.route('/:uniqueId/users/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
};
