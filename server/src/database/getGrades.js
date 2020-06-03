import {Connection} from "./Connection.js"

const getGrades = async(selector) => {
    function removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    return new Promise((resolve, reject) => {
        let boulerFilter = selector.match("boulders")?  `AND id < 58` : ""
        let query = `SELECT id, ${selector} FROM grade WHERE ${selector} NOT LIKE '%/%' AND ${selector} != '' ${boulerFilter}`
        
        Connection.query(query, (err, res) => {
            if (err) reject(err)
            let grades = removeDuplicates(res, selector)
            let formattedGrades = grades.map(el => ({id: el.id, grade: el[selector]}))
            
            return resolve(formattedGrades)
        })
    })
}

export default getGrades