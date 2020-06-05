import {Connection} from "./Connection"

const formatDateString = (dateStr) => {
    let date = new Date(dateStr)
    const paddingZeros = (number) => { 
        return number<100? (number<10? `0${number}` : `${number}`) : ""
    }

    let MM = paddingZeros(date.getMonth() + 1) // is zero based
    let dd = paddingZeros(date.getDate())
    let hh = paddingZeros(date.getHours())
    let mm = paddingZeros(date.getMinutes())
    let ss = paddingZeros(date.getSeconds())

    let dateString = `${date.getFullYear()}-${MM}-${dd}`
    
    return dateString
}


const getHangboardSessions = async (username) => {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT date, body_weight_kg, max_strength_left_kg, max_strength_right_kg FROM hangboard_sessions WHERE user_name = '${username}'`

        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        Connection.query(query, (err, res) => {
            if (err) reject(err)
            let formattedData = {data:[], keys: ["Relative"]}//"Left", "Right", 
            for (let i=0; i<res.length; i++) {
                let point = {
                    x: formatDateString(res[i].date),
                    "Left": res[i].max_strength_left_kg,
                    "Right": res[i].max_strength_right_kg,
                    "Relative": parseFloat(formatter.format(res[i].body_weight_kg/(res[i].max_strength_right_kg + res[i].max_strength_left_kg)))
                }
                formattedData.data.push(point)
            }
            return resolve(formattedData)
        })
    })


}

export default getHangboardSessions