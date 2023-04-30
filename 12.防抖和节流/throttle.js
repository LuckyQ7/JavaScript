function throttle(fn, interval, options = { immediate: false, trailing: true }, callback) {
    let lastTime = 0
    let timer = null
    const _throttle = function (...args) {
        const nowTime = +new Date()
        if (lastTime == 0 && !options.immediate) lastTime = nowTime

        const reamainTime = interval - (nowTime - lastTime)  // 剩余时间

        if (reamainTime <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            const result = fn.apply(this, args)
            if (callback) callback(result)
            lastTime = nowTime
            // 如果刚好到时间 不添加定时器
            return
        }

        // 添加一个定时器 让最后一次也执行   
        if (options.trailing && !timer) {
            timer = setTimeout(() => {
                timer = null
                lastTime = !options.immediate ? 0 : +new Date()
                const result = fn.apply(this, args)
                if (callback) callback(result)

            }, reamainTime)
        }
    }

    return _throttle
}
