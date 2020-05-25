import {Connection} from "./Connection"

const updateUserSettings = async (settings, username) => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE users SET boulderGradeFB=${settings.boulderGradeFB}, boulderGradeV=${settings.boulderGradeV}, routesGradeFrench=${settings.routesGradeFrench}, routesGradeYDS=${settings.routesGradeYDS} WHERE user_name='${username}'`
        Connection.query(query, (err, res) => {
            if (err) reject(err)
            console.log("Response after settings update", res)
            return resolve(res)
        })
    })
}

export default updateUserSettings