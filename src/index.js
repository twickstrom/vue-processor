import Vue from 'vue'

let maxTime = 200
let delay = 1

const asyncForeach = (array, fn, options) => {
  return new Promise((resolve, reject) => {
    let index = 0
    let count = array.length
    let now = () => new Date().getTime()
    let maxTime = (options || {}).hasOwnProperty('maxTime') ? options.maxTime : maxTime
    let delay = (options || {}).hasOwnProperty('delay') ? options.delay : delay

    let doChunk = () => {
      let startTime = now()

      while (index < count && (now() - startTime) <= maxTime) {
        fn(array[index], index, array)
        ++index
      }

      if (index < count) {
        setTimeout(doChunk, delay)
      } else {
        resolve(true)
      }
    }

    doChunk ()
  })
}


const VueProcessor = {
  install (Vue, options) {
    maxTime = (options || {}).hasOwnProperty('maxTime') ? options.maxTime : maxTime
    delay = (options || {}).hasOwnProperty('delay') ? options.delay : delay
    Vue.$processor = asyncForeach
    Vue.prototype.$processor = asyncForeach
  }
}

export default VueProcessor
