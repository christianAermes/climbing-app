import {Connection} from "./Connection"
import formatDateString from "../formatDateString"

const insertNewIndoorSession = async (session) => {
    return new Promise((resolve, reject) => {
        
        session.date = formatDateString(session.date)
        let validEntries = Object.keys(session).filter(el => el.match(/bracket/)!==null && session[el] !== '0')
        
        
        if (!session.hasOwnProperty("gym") || session.gym === "") {
            let message = "Please enter the name of the gym for this session."
            // console.log(message)
            return resolve({success: false, message: message})
        }
        if (validEntries.length === 0) {
            let message = "You should enter at least one completed boulder or route."
            // console.log(message)
            return resolve({success: false, message: message})
        }
        
        
        let query = `INSERT INTO indoor_sessions SET ?`

        Connection.query(query, session, (err, res) => {
            if (err) return reject(err)
            console.log(res)
            return resolve({success: true, message: "Successfully inserted data."})
        })
    })
}

export default insertNewIndoorSession