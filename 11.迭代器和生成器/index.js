// ? 1.什么是迭代器？
function createArrayIterator(arr) {
    let index = 0
    return {
        next() {
            if (index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}
const colors = ['red', 'green', 'blue']
const colorIterator = createArrayIterator(colors)
// console.log(colorIterator.next());
// console.log(colorIterator.next());
// console.log(colorIterator.next());
// ? 2.什么是可迭代对象？
const itertorObj = {
    colors: ['red', 'green', 'blue'],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.colors.length) {
                    return { done: false, value: this.colors[index++] }
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}
const iterator1 = itertorObj[Symbol.iterator]()
// console.log(iterator1.next());
// console.log(iterator1.next());
// console.log(iterator1.next());
// console.log(iterator1.next());
// !. 3.for ... of 可以遍历的东西必须是一个可迭代对象。  done为true的时候就会停止
const obj = { name: "san", age: 18 }
for (const item of itertorObj) {
    console.log(item);
}


const arr = Array.from(itertorObj)

console.log(arr);