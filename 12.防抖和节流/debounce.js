function debounce(fn, delay, immediate = false, callback) {
    let timer = null
    let isInvoke = false

    const _debounce = function (...args) {
        if (timer) clearTimeout(timer)

        // 是否首次执行
        if (immediate && !isInvoke) {
            const result = fn.apply(this, args)
            if (callback) callback(result)
            isInvoke = true
        } else {
            timer = setTimeout(() => {
                const result = fn.apply(this, args)
                if (callback) callback(result)
                isInvoke = false
            }, delay)
        }
    }

    return _debounce
}


