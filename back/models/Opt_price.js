const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'opt_prices', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
)