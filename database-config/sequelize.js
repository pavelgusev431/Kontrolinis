import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize({
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
});

try {
    sequelize.authenticate();
    console.log(`\x1b[33mConnected to ${DB_NAME} on ${DB_HOST}:${DB_PORT} as user ${DB_USER}`,"\x1b[0m");
} catch (error) {
    console.error(error);
}

export default sequelize;