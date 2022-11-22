const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/tasks.db'
});

sequelize.sync({alter: true}).then(() => {
    console.log('All models were successfully synced')
})

module.exports = sequelize;