import {Connection} from "./Connection"

const deleteUser = (username) => {
    return new Promise((resolve, reject) => {
        
        let query = `DELETE FROM users WHERE user_name='${username}'`
        // return resolve({query: query})
        Connection.query(query, (err, res) => {
            if (err) reject(err)
            return resolve(res)
        })
    })

}

export default deleteUser