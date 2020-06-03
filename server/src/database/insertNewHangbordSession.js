import {Connection} from "./Connection"
import formatDateString from "../formatDateString"

const insertNewHangboardSession = async (session) => {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO hangboard_sessions SET ?`
        console.log(session)
        session.date = formatDateString(session.date)
        console.log(session)
        Connection.query(query, session, (err, res) => {
            if (err) return reject(err)
            return resolve(res)
        })

    })
}

export default insertNewHangboardSession