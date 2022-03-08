class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}


class Student extends Person {
    constructor(name, age) {
        super(name, age)
    }

    eating() {
        console.log(2);
    }
}


const stu1 = new Student('cc', 1)


console.log(Object.getOwnPropertyDescriptors(stu1.__proto__));