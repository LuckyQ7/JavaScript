let s1 = Symbol('aaa')
let s2 = Symbol('bbb')

const obj = {
    name: 'tom',
    firends: ['amy', 'coby', 'sam'],
    city: {
        region: 'hz'
    },
    foo: function () {
        console.log(123);
    },
    [s1]: 'aa',
    s2: s2,
    set: new Set(['a', 'b']),
    map: new Map([['a', 'c'], ['b', 'c'], ['b', 'c'], ['c', 'c']])
}

obj.info = obj

function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType == 'object' || valueType == 'function')
}

function deepClone(originValue, map = new WeakMap()) {
    // 处理map类型
    if (originValue instanceof Map) return new Map([...originValue])
    // 处理set类型
    if (originValue instanceof Set) return new Set([...originValue])
    // 处理symbol类型
    if (typeof originValue === 'symbol') return Symbol(originValue.description)
    // 处理函数类型
    if (typeof originValue === 'function') return originValue
    // 处理简单类型
    if (!isObject(originValue)) return originValue
    // 解决循环引用的问题
    if (map.get(originValue)) return map.get(originValue)
    // 处理数组和对象类型
    const newObject = Array.isArray(originValue) ? [] : {}

    map.set(originValue, newObject)

    for (const key in originValue) {
        newObject[key] = deepClone(originValue[key], map)
    }

    // 处理key为symbol
    const symbolKeys = Object.getOwnPropertySymbols(originValue)

    for (const key of symbolKeys) {
        newObject[key] = deepClone(originValue[key], map)
    }
    return newObject
}

const newObj = deepClone(obj)
console.log(obj);
console.log(newObj); 