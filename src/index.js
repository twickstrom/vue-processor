const max = {
  time: 200,
  delay: 1,
  get time() {
    return this.time
  },
  set time(ms) {
    if (ms) {
      this.time = ms
    }
  },
  get delay() {
    return this.delay
  },
  set delay(ms) {
    if (ms) {
      this.delay = ms
    }
  },
}

const now = () => new Date().getTime()

const asyncForeach = (array, fn, options) => new Promise((resolve) => {
  let index = 0
  const count = array.length

  max.time = (options || {}).maxTime
  max.delay = (options || {}).delay

  const doChunk = () => {
    const startTime = now()

    while (index < count && (now() - startTime) <= max.time) {
      fn(array[index], index, array)
      index += 1
    }

    if (index < count) {
      setTimeout(doChunk, max.delay)
    } else {
      resolve(true)
    }
  }

  doChunk()
})

const VueProcessor = {
  install(app, options) {
    max.time = (options || {}).maxTime
    max.delay = (options || {}).delay

    if ('config' in app && 'globalProperties' in app.config) {
      app.config.globalProperties.$processor = asyncForeach
    } else {
      app.prototype.$processor = asyncForeach
    }
  }
}

export default VueProcessor
