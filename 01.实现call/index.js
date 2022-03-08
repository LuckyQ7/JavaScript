

Function.prototype._call = function _call(thisArg, ...args) {
    // 隐式绑定this
    const fn = this
    // 防止是非对象类型
    thisArg = (thisArg != undefined && thisArg !== null) ? Object(thisArg) : window
    // 绑定this
    thisArg.fn = fn
    // 传入其他参数
    var result = thisArg.fn(...args)
    delete thisArg.fn

    return result
}

function num(n1, n2) {
    console.log(this);
    return n1 + n2
}

const result = num._call(2, 3, 2)

const res2 = num.call(undefined, 3, 2)

console.log(result, res2);