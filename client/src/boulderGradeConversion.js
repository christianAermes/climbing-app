const boulderGradeConversionFromFB = (fb) => {
    fb = fb.toLowerCase()
    if (fb==="1" || fb==="2" || fb==="3") {
        return 0
    } else if (fb==="4") {
        return 1
    } else if (fb==="5") {
        return 2
    } else if (fb==="6a") {
        return 3
    } else if (fb==="6a+") {
        return 4
    } else if (fb==="6b" || fb==="6b+") {
        return 5
    } else if (fb==="6c") {
        return 6
    } else if (fb==="6c+" || fb==="7a") {
        return 7
    } else if (fb==="7a+") {
        return 8
    } else if (fb==="7b") {
        return 9
    } else if (fb==="7b+" || fb==="7c") {
        return 10
    } else if (fb==="7c+") {
        return 11
    } else if (fb==="8a") {
        return 12
    } else if (fb==="8a+") {
        return 13
    } else if (fb==="8b") {
        return 14
    } else if (fb==="8b+") {
        return 15
    } else if (fb==="8c") {
        return 16
    } else if (fb==="8c+") {
        return 17
    } else if (fb==="9a") {
        return 18
    }
    else return -1

}

const boulderGradeConversionFromV = (V) => {
    V = V.toLowerCase()
    let vScale = ["vb", "v0", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10", "v11", "v12", "v13", "v14", "v15", "v16", "v17"]
    return vScale.indexOf(V)
}

const boulderGradeConversionToFB = (numGrade) => {
    numGrade = Math.floor(numGrade)
    let fbScale = ["1", "4", "5", "6a", "6a+", "6b", "6c", "6c+", "7a+", "7b", "7b+", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a"]
    let fbGrade = fbScale[numGrade]
    return fbGrade.toUpperCase()
}

const boulderGradeConversionToV = (numGrade) => {
    numGrade = Math.floor(numGrade)
    let vScale = ["vb", "v0", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10", "v11", "v12", "v13", "v14", "v15", "v16", "v17"]
    let vGrade = vScale[numGrade]
    return vGrade.toUpperCase()
}

export { boulderGradeConversionFromFB, boulderGradeConversionFromV, boulderGradeConversionToFB, boulderGradeConversionToV}