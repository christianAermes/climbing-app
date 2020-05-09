import {Connection} from "./Connection"

const userCredentials = async(username) => {
    return new Promise((resolve, reject) => {
        Connection.query(`SELECT * FROM users WHERE user_name='${username}'`, (err, res)=>{
            if (err) {
                return reject(err)
            }
            resolve(res)
        })
    })
}

export default userCredentials