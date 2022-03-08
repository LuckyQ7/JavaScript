function double(num) {
    return 2 * num
}

function square(num) {
    return num ** 2
}


function CmposeFn(...fns) {
    let length = fns.length
    for (let i = 0; i < length; i++) {
        if (typeof fns[i] !== 'function') {
            throw new TypeError('arg is noa function')
        }
    }
    return function compose(...args) {
        let index = 0
        let result = length ? fns[index].apply(this, args) : args
        while (++index < length) {
            result = fns[index].call(this, result)
        }
        return result
    }
}


console.log(CmposeFn(double, square)());