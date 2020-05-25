import {Connection} from "./Connection"

const userCredentials = async(username) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT idusers, user_name, password, email, boulderGradeFB, boulderGradeV, routesGradeFrench, routesGradeYDS FROM users WHERE user_name='${username}'`
        Connection.query(query, (err, res)=>{
            if (err) {
                return reject(err)
            }
            console.log(res)
            resolve(res)
        })
    })
}

export default userCredentials