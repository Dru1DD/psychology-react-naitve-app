function renderListOfAnotherSegments () {
    let arr = []
    for(let i = 0; i < 16; i++) { 
        if( i === 0) {
            arr.push({
                catagory: "",
                problem: "",
                emotion: "",
                color: ""
            })
        }
        arr.push({
            catagory: "",
            problem: "",
            emotion: "",
            color: "#808080"
        })
    }

    return arr
}

console.log(renderListOfAnotherSegments())

