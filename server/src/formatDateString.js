
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

    let dateString = `${date.getFullYear()}-${MM}-${dd} ${hh}:${mm}:${ss}`
    // console.log(dateString)
    
    return dateString
}

export default formatDateString