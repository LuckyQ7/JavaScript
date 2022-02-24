function add(x, y, z) {
    return x + y + z
}

function Currying(fn) {
    return function curried(...args) {
        // 当前已经接收参数个数和需要接收的参数一致 
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            // 如果接收的参数没达到需要接受的参数的个数，返回一个新的函数继续接收
            return function curried2(...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}


const cAdd = Currying(add)

console.log(cAdd(10, 20, 30)); 