import {Connection} from "./Connection"

const selectUserSettings = async(username) => {
    return new Promise((resolve, reject)=>{
        let query = `SELECT * FROM users WHERE user_name='${username}'`
        Connection.query(query, (err, res)=>{
            if (err) return reject(err)
            return resolve(res)
        })
    })
}

export default selectUserSettings