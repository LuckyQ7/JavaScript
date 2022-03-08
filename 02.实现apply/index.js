Function.prototype._apply = function (thisArg, argArray) {
    if (!(argArray instanceof Array)) {
        throw new Error("CreateListFromArrayLike called on non-object")
    }
    argArray = argArray ? argArray : []
    // 获取到函数体
    const fn = this
    // 获取this
    thisArg = (thisArg != undefined && thisArg !== null) ? Object(thisArg) : window
    // 绑定this
    thisArg.fn = fn
    // 调用函数
    const result = thisArg.fn(...argArray)

    return result
}

function insert(a) {
    console.log(this, a);
}

insert._apply(0, [2])
