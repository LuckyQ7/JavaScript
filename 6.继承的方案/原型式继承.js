let info1 = {
    age: 18
}

let obj2 = Object.create(info1)

console.log(obj2.__proto__);