import {Connection} from "./Connection.js"

const getGrades = async() => {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT * FROM grade`

        Connection.query(query, (err, res) => {
            if (err) reject(err)
            return resolve(res)
        })
    })
}

export default getGrades