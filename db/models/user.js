'use strict';

const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.associate = function (models) {
        User.hasMany(models.Event);
      };
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.addHook('beforeCreate', async function (user) {
    const salt = await bcrypt.genSalt(10);
    console.log(user);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.prototype.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      return done(err, isMatch);
    });
  };

  return User;
};
