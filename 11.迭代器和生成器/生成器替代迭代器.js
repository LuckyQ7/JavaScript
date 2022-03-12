function* create(arr) {
    yield* arr
}

const iterator = create(['color', 'red', 'blue'])

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());