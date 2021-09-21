import { Sequelize } from "sequelize";


const db = new Sequelize('db_stock', 'root', 'matias2011',{
    host: 'localhost',
    dialect: 'mysql',
    // logging: 'false'
});

export default db;