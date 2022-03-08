const obj = {
    age: 'qq'
}

Object.defineProperty(obj, 'age', {
    writable: true,
    enumerable: true,
    configurable: true,
    value: undefined,

    get() {
        console.log('有人访问了age');
    },
    set() {
        console.log('设置了');
    }
})


