import sequelize from "../database-config/sequelize.js";
import { DataTypes } from "sequelize";
import Author from "./authorsModel.js";

const Book = sequelize.define(
    "Book",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,],
            }
        },
        summary: {
            type: DataTypes.STRING,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            is: /^(\d\-?){9}\d$/,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "books",
        modelName: "Book"
    }
);

Author.hasMany(Book, {
    foreignKey: "authorId",
    targetKey: "id",
});

try {
    Book.sync({ force: true, alter: true });
    console.log("\x1b[32mNew table 'books' created", "\x1b[0m");
} catch (error) {
    console.error(error);
}

export default Book;