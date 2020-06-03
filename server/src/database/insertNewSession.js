import {Connection} from "./database/Connection.js"

const insertNewSession = async (table, session) => {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO ${table}
                        (gym,
                         user_name,
                         date,
                         boulders_grade1
                        ) 
                        VALUES`
        console.log(query)
        // Connection.query(query, (err, res) => {
        //     if (err) reject(err)
        //     return resolve(res)
        // })
    })
}

export default insertNewSession