const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Image = require('./imagesModel');
const Log = require('./logsModel');
const User = require('./usersModel');

const Cache = sequelize.define('caches', {
  cacheID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  difficulty: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false
  },
  hint: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

Cache.belongsTo(User, { foreignKey: 'userID' });
Cache.hasMany(Image, { foreignKey: 'imageID' });
Cache.hasMany(Log, { foreignKey: 'logID' });

module.exports = Cache;
