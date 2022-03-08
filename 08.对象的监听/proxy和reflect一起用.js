const person = {
    age: 18
}

const personProxy = new Proxy(person, {
    get(target, key, receiver) {
        console.log('获取了' + key, receiver);
        console.log(receiver === personProxy);
        return Reflect.get(target, key)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue)
    }
})


personProxy.age

