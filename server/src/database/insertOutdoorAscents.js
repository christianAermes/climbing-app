import {Connection} from "./Connection"
import formatDateString from "../formatDateString"

const formatAscents = (ascents, user_id, user_name, climb_type) => {
    return ascents.map(ascent => 
        [
            formatDateString(ascent.date),
            ascent.top? 0 : ascent.flash? 1 : null,
            climb_type,
            ascent.grade,
            ascent.name,
            ascent.crag,
            user_id,
            user_name
        ]
    )
}

const insertOutdoorAscents = async (user_name, user_id, boulders, routes) => {
    return new Promise((resolve, reject) => {
        let ascentsBoulders = formatAscents(boulders, user_id, user_name, 1)
        let ascentsRoutes = formatAscents(routes, user_id, user_name, 0)
        let ascents = [...ascentsBoulders, ...ascentsRoutes]
        console.log(ascents)
        let query = `INSERT INTO outdoor_ascents (
                            date, method, climb_type, grade_id, name, crag, user_id, user_name
                        ) 
                        VALUES ?`
        Connection.query(query, [ascents], (err, res) => {
            if (err) return reject(err)
            return resolve(res)
        })
    })
}

export default insertOutdoorAscents