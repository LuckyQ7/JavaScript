let activeReactiveFn = null
class Depend {
    constructor() {
        this.reactives = new Set()
    }
    depand() {
        if (activeReactiveFn) {
            this.reactives.add(activeReactiveFn)
        }
    }
    addDepend(reactivefn) {
        this.reactives.add(reactivefn)
    }
    notify() {
        this.reactives.forEach(fn => fn())
    }
}
// 收集依赖的函数
function watchFn(fn) {
    // 默认先执行一次
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
}
// 存放对象数据结构
const weakMap = new WeakMap()
function getDepend(target, key) {
    let targetObjMap = weakMap.get(target)
    if (!targetObjMap) {
        targetObjMap = new Map()
        weakMap.set(target, targetObjMap)
    }
    let depand = targetObjMap.get(key)
    if (!depand) {
        depand = new Depend()
        targetObjMap.set(key, depand)
    }
    return depand
}
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            // 先收集依赖
            const depand = getDepend(target, key)
            depand.depand()
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
            // 获取依赖
            const depand = getDepend(target, key)
            depand.notify()
        }
    })
}
const objProxy = reactive({
    name: '66',
    age: 18
})

// 代理对象
watchFn(function () {
    // 触发getter
    console.log('1---start');
    console.log(objProxy.name);
    console.log('1---end');

})
watchFn(function () {
    console.log('2---start');
    // 触发getter
    console.log(objProxy.age);
    console.log('2---end');
})

objProxy.age = 12
objProxy.name = 'qiqi'