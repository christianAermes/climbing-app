import {Connection} from "./Connection"

const selectUserSettings = async(username) => {
    return new Promise((resolve, reject)=>{
        let query = `SELECT idusers, user_name, boulderGradeFB, boulderGradeV, routesGradeFrench, routesGradeYDS FROM users WHERE user_name='${username}'`
        Connection.query(query, (err, res)=>{
            if (err) return reject(err)
            return resolve(res)
        })
    })
}

export default selectUserSettings