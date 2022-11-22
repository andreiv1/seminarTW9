const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize')
const Task = sequelize.define('Task',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: "Tasks"
    })

module.exports = Task;