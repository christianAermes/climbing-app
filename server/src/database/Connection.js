import config from "../config"
import mysql from "mysql"

export const Connection = mysql.createConnection(config.mysql)

Connection.connect((err) => {
    if (err) console.log(err)
})