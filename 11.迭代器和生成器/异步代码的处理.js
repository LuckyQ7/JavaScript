function request(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 2000)
    })
}

function* getData() {
    const res = yield request('aaa')
    const res1 = yield request(res + 'bbb')
    console.log(res1);
}

// const get = getData()

// get.next().value 是一个promise
/* get.next().value.then(res => {
    get.next(res).value.then(res1 => {
        get.next(res1)
    })
})
 */

function execuGenerator(genFn) {
    console.log(genFn);
    const genrator = genFn()
    function exec(res) {
        const result = genrator.next(res)
        if (result.done) return result.value

        result.value.then(res => { 
            exec(res)
        })
    }
    exec()
}

execuGenerator(getData)