import {Connection} from "./Connection.js"

const getOutdoorSessions = async(username) => {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT * FROM outdoor_sessions WHERE user_name='${username}' ORDER BY date ASC`

        Connection.query(query, (err, res) => {
            if (err) reject(err)
            return resolve(res)
        })
    })
}

export default getOutdoorSessions