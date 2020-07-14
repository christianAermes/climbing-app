import {Connection} from "./Connection.js"

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

const findClosestGradeToID = (gradeID, grades) => {
    let closest = 1000000
    let closestID = 0
    let closestGrade = ""
    for (let i=0; i<grades.length; i++) {
        let grade = grades[i]
        
        if (Math.abs(grade.id-gradeID) < closest) {
            closest = Math.abs(grade.id-gradeID)
            closestID = grade.id
            closestGrade = grade.grade
        }
    }
    // console.log(closestGrade, closestID, gradeID)
    return closestGrade
}

const formatAscents = (ascents, grades) => {
    let formattedAscents = {}
    for (let ascent of ascents) {
        let closestGrade = findClosestGradeToID(ascent.grade_id, grades)
        if (formattedAscents.hasOwnProperty(closestGrade)) {
            if (ascent.method === 0) {
                formattedAscents[closestGrade].flash += 1
            } else if (ascent.method === 1) {
                formattedAscents[closestGrade].top += 1
            }
        } else {
            formattedAscents[closestGrade] = {top: 0, flash: 0}
            if (ascent.method === 0) {
                formattedAscents[closestGrade].flash += 1
            } else if (ascent.method === 1) {
                formattedAscents[closestGrade].top += 1
            }
        }
    }
    let ascentData = []
    for (let grade of grades) {
        if (formattedAscents.hasOwnProperty(grade.grade)) {
            ascentData.push({x: grade.grade, top: formattedAscents[grade.grade].top, flash: formattedAscents[grade.grade].flash})
        } else {
            ascentData.push({x: grade.grade, top: 0, flash: 0})
        }
    }
    return ascentData
}

const getOutdoorAscents = async(username, boulderGrades, routeGrades) => {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT * FROM outdoor_ascents WHERE user_name='${username}' ORDER BY date ASC`

        Connection.query(query, (err, res) => {
            if (err) reject(err)
            let routes = res.filter(el => el.climb_type===0)
            let boulders = res.filter(el => el.climb_type===1)
            
            let boulderData = formatAscents(boulders, boulderGrades)
            let routeData   = formatAscents(routes, routeGrades)
            
            console.log(boulderData)
            console.log(routeData)

            let data = {boulder: {data: boulderData, keys: ["top", "flash"]}, routes: {data: routeData, keys: ["top", "flash"]}}

            return resolve(data)
        })
    })
}

export default getOutdoorAscents