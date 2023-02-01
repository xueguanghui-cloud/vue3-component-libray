import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'

import ghRequest from './service'
/* ghRequest.request({
  url: '/get',
  method: 'GET'
}) */

interface dataType {
  args: any
  data: string
  files: any
  form: any
  json: any
  origin: string
  url: string
}
ghRequest
  .request<dataType>({
    url: '/post',
    method: 'POST',
    data: {
      name: 'codexgh',
      age: 19
    }
  })
  .then((res) => {
    console.log(res.data)
  })

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
