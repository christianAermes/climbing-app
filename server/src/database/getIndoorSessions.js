import {Connection} from "./Connection.js"

// const getIndoorSessions = async(username) => {
//     return new Promise((resolve, reject) => {
        
//         let query = `SELECT * FROM indoor_sessions_old WHERE user_name='${username}' ORDER BY date ASC`

//         Connection.query(query, (err, res) => {
//             if (err) reject(err)
//             return resolve(res)
//         })
//     })
// }

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

const getIndoorSessions = async(username) => {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT * FROM indoor_sessions WHERE user_name='${username}' ORDER BY date ASC`

        Connection.query(query, (err, res) => {
            if (err) reject(err)

            let formattedData = {
                boulder: {
                    data: [], 
                    keys: ["boulder_bracket_0", "boulder_bracket_1", "boulder_bracket_2", "boulder_bracket_3", "boulder_bracket_4"]
                }, 
                routes: {
                    data: [],
                    keys: ["route_bracket_0", "route_bracket_1", "route_bracket_2", "route_bracket_3", "route_bracket_4", "route_bracket_5"]
                }}
            console.log(res)
            for (let i=0; i<res.length; i++) {
                let boulderPoint = {
                    x: formatDateString(res[i].date),
                    "boulder_bracket_0": res[i]["boulder_bracket_0"],
                    "boulder_bracket_1": res[i]["boulder_bracket_1"],
                    "boulder_bracket_2": res[i]["boulder_bracket_2"],
                    "boulder_bracket_3": res[i]["boulder_bracket_3"],
                    "boulder_bracket_4": res[i]["boulder_bracket_4"],
                }
                let routePoint = {
                    x: formatDateString(res[i].date),
                    "route_bracket_0": res[i]["route_bracket_0"],
                    "route_bracket_1": res[i]["route_bracket_1"],
                    "route_bracket_2": res[i]["route_bracket_2"],
                    "route_bracket_3": res[i]["route_bracket_3"],
                    "route_bracket_4": res[i]["route_bracket_4"],
                    "route_bracket_5": res[i]["route_bracket_5"],
                }
                formattedData.boulder.data.push(boulderPoint)
                formattedData.routes.data.push(routePoint)
            }
            return resolve(formattedData)
        })
    })
}

export default getIndoorSessions