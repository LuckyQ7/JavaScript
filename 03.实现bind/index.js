Function.prototype._bind = function (thisArg, ...argArray) {
    // 获取到真实的fn
    const fn = this
    // 获取到this
    thisArg = (thisArg !== undefined && thisArg !== null) ? Object(thisArg) : window
    // 代理Fn
    function proxyFn(...args) {
        thisArg.fn = fn
        var finalArgs = [...argArray, ...args]
        var result = thisArg.fn(...finalArgs)
        return result
    }

    return proxyFn
}


function num(a1, a2, num2, num3) {
    console.log(a1, a2, num2, num3, this);
}

// const newNum = num.bind("aaa", 1, 2)
// num(1, 3)
const newNum = num._bind("aaaa", 1, 2)
newNum(3, 4)