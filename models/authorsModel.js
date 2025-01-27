import sequelize from "../database-config/sequelize.js";
import { DataTypes } from "sequelize";

const Author = sequelize.define(
    "Author",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2,],
            }
        },
        birthDate: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^\d{4}\-\d{2}\-\d{2}$/,
            isDate: true,
        },
        biography: {
            type: DataTypes.STRING,
            validate: {
                len: [,150],
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "authors",
        modelName: "Author"
    }
);

try {
    Author.sync({ force: true, alter: true });
    console.log("\x1b[32mNew table 'authors' created","\x1b[0m");
} catch (error) {
    console.error(error);
}

export default Author;