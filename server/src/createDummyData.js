import {Connection} from "./database/Connection.js"

export const createDummyDataIndoor = () => {
    let dataArr = []
   
    for (let session=0; session<20; session++) {
        let d = new Date()
        d.setDate(d.getDate()-session)
        let data = {
            user_name: "Christian",
            gym: "Bloc no Limit",
            date: d
        }
        for (let i=0; i<19; i++) {
            data[`boulders_grade${i}`] = Math.floor(Math.random()*10)
        }
        dataArr.push(data)
        // console.log(data)
    }
    // console.log(dataArr)
    // return dataArr
    
    for (let i=0; i<dataArr.length; i++) {
        // console.log(data)
        Connection.query("INSERT INTO indoor_sessions SET ?", dataArr[i], (err, res)=>{
            if (err) console.log(err)
            console.log(res)
        })
        // break
    }
    
    
}

const randomG = () => {
    let r = 0
    let v = 5
    for (let i=0; i<v; i++) {
        r += Math.random()
    }
    return Math.min(Math.abs((r/v-0.5)*50), 19)
}

export const createDummyDataOutdoor = () => {
    let dataArr = []
   
    for (let session=0; session<9; session++) {
        let d = new Date()
        d.setDate(d.getDate()-session)
        let data = {
            user_name: "Christian",
            crag: "Kirchbruch Beucha",
            date: d
        }
        for (let i=0; i<19; i++) {
            data[`boulders_grade${i}`] = Math.round(randomG())
        }
        dataArr.push(data)
    }
    // console.log(dataArr)
    for (let i=0; i<dataArr.length; i++) {
        Connection.query("INSERT INTO outdoor_sessions SET ?", dataArr[i], (err, res)=>{
            if (err) console.log(err)
            console.log(res)
        })
    }
    
    
}
