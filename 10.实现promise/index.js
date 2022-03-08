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
                    if (this.status !== PROMISE_STATUS_PENDING) return
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
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onrejecteds.forEach(fn => fn(reason))

                })
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    then(onfulfilled, onrejected) {
        return new MyPromise((resolve, reject) => {
            // 如果状态已经确定 
            if (this.status === PROMISE_STATUS_FULFILLED && onfulfilled) {
                try {
                    const value = onfulfilled(this.value)
                    resolve(value)
                } catch (error) {
                    reject(error)
                }

            }
            if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
                try {
                    const reason = onrejected(this.value)
                    reject(reason)
                } catch (error) {
                    reject(error)
                }
            }

            if (this.status === PROMISE_STATUS_PENDING) {
                this.onfulfilleds.push(() => {
                    try {
                        const value = onfulfilled(this.value)
                        resolve(value)
                    } catch (error) {
                        reject(error)
                    }

                })

                this.onrejecteds.push(() => {
                    try {
                        const reason = onrejected(this.reason)
                        resolve(reason)
                    } catch (error) {
                        reject(error)
                    }
                })


            }
        })
    }
}

const promise = new MyPromise((resolve, reject) => {
    // resolve(123)
    reject('123aa')
    // throw new Error(123)
})


promise.then((res) => {
    console.log('res1:', res,);
    // throw new Error(123)
}, (err) => {
    console.log('err1:', err);
    return 123
    // throw new Error(22222)
}).then(res => {
    console.log("res2:", res);
}, (err) => {
    console.log('err2:', err);
})



// promise.then((res) => {
//     console.log(res, 'res2');
// }, (err) => {
//     console.log(err, 'err2');
// })

// setTimeout(() => {
//     promise.then(res => {
//         console.log(res);
//     })
// }, 3000)

// 解决多次调用
// 解决宏任务不继续执行
// 解决链式调用 