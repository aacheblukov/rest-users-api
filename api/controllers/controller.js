'use strict';


var mongoose = require('mongoose');
mongoose.Model.exists = async function (options) {
    const result = await this.findOne(options).select("_id").lean();
    return result ? true : false;
  };

const getClearResponseBody = t => ({id: t.id, name: t.name});

exports.getAllUsers = function(req, res) {
    const modelName = mongoose.model(req.params.uniqueId)
    modelName.find({}, function(err, users) {
    if (err)
      res.send(err);
      const usersToSend = users.length ? users.map(getClearResponseBody) : []
    res.json(usersToSend);
  });
};




exports.createUser = function(req, res) {
  const modelName = mongoose.model(req.params.uniqueId);
  const user = modelName(req.body);
  modelName.find({id: req.body.id}, function(err, item) {
    if (Boolean(item.length)) {
        res.status(400).send('User with this id is already exists');
    } else {
        user.save(function(err, task) {
            if (err) {
                res.status(400).send('Cannot get required params. Check for id and name in body');
            } else {
                res.json(task);
            }
        });
    }
  })
};


exports.getUser = async function(req, res) {
    const modelName = mongoose.model(req.params.uniqueId);
    const userExists = await modelName.exists({id: req.params.id});

    modelName.findOne({id: req.params.id}, function(err, user) {
        if (!userExists) {
            res.status(404).send("User with this id does not exist");
        }
        else if (err) {
            res.send(err);
        } else {
            res.json(getClearResponseBody(user));
        }
  });
};


exports.updateUser = async function(req, res) {
    const modelName = mongoose.model(req.params.uniqueId);
    const userExists = await modelName.exists({id: req.params.id});
    modelName.findOneAndUpdate({id: req.params.id}, req.body, {new: true}, function(err, user) {

    if (!userExists) {
        res.status(404).send("User with this id does not exist");
    } else if (err) {
        res.send(err);
    } else {
        res.json(getClearResponseBody(user));
    }

  });
};


exports.deleteUser = async function(req, res) {
    const modelName = mongoose.model(req.params.uniqueId);
    const userExists = await modelName.exists({id: req.params.id});
    modelName.remove({
    id: req.params.id
  }, function(err, user) {
    if (!userExists) {
        res.status(404).send("User with this id does not exist");
    } else if (err) {
        res.send(err);
    } else {
        res.json({ message: `User with id ${req.params.id} successfully deleted` });
    }
  });
};
