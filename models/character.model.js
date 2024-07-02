import {DataTypes, Model, Sequelize} from 'sequelize';
import fs from "fs";

//LOCAL CONNECT
// const sequelize = new Sequelize('sequlizepgtest', 'pavelgorbunov', 'pavelgorbunov', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false
// });

//SSL CONNECT
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: fs.readFileSync('/home/runner/.postgresql/root.crt').toString(),
        },
    },
})

class Character extends Model {}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.JSONB
    }
}, {sequelize, modelName: 'Character'});


export {sequelize, Character}
