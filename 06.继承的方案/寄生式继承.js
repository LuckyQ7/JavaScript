var person = {
    age: 18
}


function createObj(name) {
    const stu = Object.create(person)
    stu.name = name

    return stu
}

var stu1 = createObj('213')

console.log(stu1);