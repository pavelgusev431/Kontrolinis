import sequelize from "../database-config/sequelize.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "users",
        modelName: "User"
    }
);

try {
    User.sync({ force: true, alter: true });
    console.log("\x1b[32mNew table 'users' created","\x1b[0m");
} catch (error) {
    console.error(error);
}

export default User;