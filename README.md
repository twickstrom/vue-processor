# VueProcessor

>   VueProcessor allows you process large amounts of data without blocking the UI.`


## Table of contents
* [VueProcessor](#vueprocessor)
* [Installation](#installation)
* [Default import](#default-import)
* [Options](#options)
* [Usage](#usage)
  * [Global Example](#global-example)
  * [Within a component](#within-a-component)
* [Example Vue Component](#example-vue-component)

## Installation

```bash
npm i vue-processor

# or

yarn add vue-processor
```

## Default import (Vue 2)
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import VueProcessor from 'vue-processor'

const app = createApp(App)

app.use(VueProcessor)
app.mount('#app')
```

## Default import (Vue 3)
```javascript
import Vue from 'vue'
import VueProcessor from 'vue-processor'
Vue.use(VueProcessor)
```

## Options
Install with global options (options)
```javascript
let options {
  maxTime: 500, // Max time (in milliseconds) per chunk. Default: 200ms
  delay: 2 // Timeout delay (in milliseconds). Defaults to 1ms
}

Vue.use(VueProcessor, options)
```

## Usage

### Global Example
```javascript
Vue.$processor(largeArray, (item, index) {
  // Your code here.
}).then(() => {
  // processing complete
})
```

### Within a component
```javascript
methods: {
  yourMethod () {
    this.$processor(largeArray, (item, index) {
      // Your code here.
    }).then(() => {
      // processing complete
    })
  }
}
```

### EXAMPLE VUE COMPONENT
```javascript
<template>
  <button
    @click="doSomethingBig"
  >
    Lets make them all count to 1 million
  </button>
</template>

<script>
export default {
  data () {
    return {
      running: false,
      arr: [{
        count: 1
      }, {
        count: 2
      }, {
        count: 3
      }, {
        count: 4
      }, {
        count: 5
      }, {
        count: 6
      }, {
        count: 7
      }, {
        count: 8
      }, {
        count: 9
      }, {
        count: 10
      }, {
        count: 11
      }, {
        count: 12
      }, {
        count: 13
      }, {
        count: 14
      }, {
        count: 15
      }, {
        count: 16
      }, {
        count: 17
      }, {
        count: 18
      }]
    }
  },
  methods: {
    doSomethingBig () {
      this.running = true
      this.$processor(this.arr, (item, index) => {
        for (var i = item.count; i <= 1000000; ++i){
        	item.count = i
        }
      }).then(() => {
        this.running = false
      })
    }
  }
}
</script>
```
