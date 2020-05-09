import {Connection} from "./Connection"

const all = async() => {
    return new Promise((resolve, reject) => {
        Connection.query("SELECT * FROM users", (err, res)=>{
            if (err) {
                return reject(err)
            }
            resolve(res)
        })
    })
}

export default all