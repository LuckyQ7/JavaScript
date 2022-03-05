function Student(name) {
    this.name = name
}
function Teacher() { }

// 创建出来的是Teacher的类型。
const stu = Reflect.construct(Student, ['aaaa'], Teacher)


console.log(stu);