const obj = {
    age: 18
}

const objProxy = new Proxy(obj, {
    /**
     * 
     * @param {*} target  obj 所代理的对象
     * @param {*} key  访问的key
     */
    get: function (target, key) {
        console.log(`有人访问了${key}`);
        return target[key]
    },
    set: function (target, key, newValue) {
        console.log(`有人修改了${key}`);
        target[key] = newValue
    },
    has(target, key) {
        return key in target
    },
    deleteProperty(target, key) {
        console.log('删除了');
        delete target[key]
    }
})


objProxy.age

objProxy.name = 'aa'

delete objProxy.name

console.log(obj);