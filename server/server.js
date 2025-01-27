import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`\x1b[36mApp started on port ${port}`,"\x1b[0m");
});