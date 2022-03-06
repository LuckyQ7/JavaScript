let PROMISE_STATUS_PENDING = 'pending'
let PROMISE_STATUS_FULFILLED = 'fulfilled'
let PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        // 初始状态
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined
        this.onfulfilleds = []
        this.onrejecteds = []
        const resolve = value => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    // 状态改变放在微任务里面，否则会立即执行onfulfilled
                    this.status = PROMISE_STATUS_FULFILLED
                    this.value = value
                    this.onfulfilleds.forEach(fn => fn(value))
                })
            }
        }
        const reject = reason => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onrejecteds.forEach(fn => fn(reason))
                })
            }
        }

        executor(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        // 如果状态已经确定 
        if (this.status === PROMISE_STATUS_FULFILLED && onfulfilled) {
            onfulfilled(this.value)
        }
        if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
            onrejected(this.reason)
        }

        if (this.status === PROMISE_STATUS_PENDING) {
            this.onfulfilleds.push(onfulfilled)
            this.onrejecteds.push(onrejected)
        }

    }
}



const promise = new MyPromise((resolve, reject) => {
    resolve(123)
    // reject('123aa')
})


promise.then((res) => {
    console.log(res, 'res1');
}, (err) => {
    console.log(err, 'err');
})



promise.then((res) => {
    console.log(res, 'res2');
}, (err) => {
    console.log(err, 'err');
})

setTimeout(() => {
    promise.then(res => {
        console.log(res);
    })
}, 3000)

// 解决多次调用
// 解决宏任务不继续执行