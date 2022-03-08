// todo √ 解决多次调用
// todo √ 解决宏任务不继续执行
// todo √ 解决链式调用
// todo √ 实现catch
// todo √ 实现finally
// todo √ 实现类方法 resolve
// todo √ 实现类方法 reject
// todo √ 实现类方法 all
// todo √ 实现类方法 allSettled
// todo √ 实现类方法 race
// todo √ 实现类方法 any


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
        // 因为reject调用的是返回的新的promis, 所以onrejected是undefined，默认抛出异常，就会被第二个promise捕捉到
        const defultOnrejected = (err) => { throw err }
        onrejected = onrejected || defultOnrejected

        // 解决加了finally无法链式调用的问题
        const defultOnfulfilled = (value) => { return value }
        onfulfilled = onfulfilled || defultOnfulfilled



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

    catch(onrejected) {
        return this.then(undefined, onrejected)
    }

    finally(onFinally) {
        return this.then(onFinally, onFinally)
    }

    static resolve(value) {
        return new MyPromise((resolve => resolve(value)))
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason))
    }

    // 返回所有成功的合集，如果有失败立即返回失败
    static all(promises) {
        // 时间
        return new MyPromise((resove, reject) => {
            const values = []
            promises.forEach(promise => {
                promise.then(value => {
                    values.push(value)
                    if (values.length == promises.length) {
                        resove(values)
                    }
                }, err => {
                    reject(err)
                })
            })
        })
    }

    // allSettled 返回一个所有成功或失败的描述对象
    static allSettled(promises) {
        return new MyPromise((resove) => {
            const results = []
            promises.forEach(promise => {
                promise.then(value => {
                    results.push({ status: PROMISE_STATUS_FULFILLED, value })
                    if (results.length == promises.length) {
                        resove(results)
                    }
                }, reason => {
                    results.push({ status: PROMISE_STATUS_REJECTED, reason })
                    if (results.length == promises.length) {
                        resove(results)
                    }
                })
            })
        })
    }

    // any 如果有成功就返回，否则返回全部失败
    static any(promises) {
        return new MyPromise((resove, reject) => {
            const reasons = []
            promises.forEach(promise => {
                promise.then(res => resove(res), reason => {
                    reasons.push(reason)
                    if (reasons.length === promises.length) {
                        reject(new AggregateError(reasons))
                    }
                })
            })
        })
    }
    // race 谁第一个成功或失败，就返回谁
    static race(promises) {
        return new MyPromise((resove, reject) => {
            promises.forEach(promise => {
                promise.then(res => { resove(res) }, err => {
                    reject(err)
                })
            })
        })
    }
}

const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(123)
    }, 1000)
})

const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(2)
    }, 2000)
})



// MyPromise.all([p1, p2]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })


// MyPromise.allSettled([p1, p2]).then(res => {
//     console.log(res);
// })


// MyPromise.race([p1, p2]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })


MyPromise.any([p1, p2]).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err.errors);
})