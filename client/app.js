import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // 包裹需要热更新的内容
import App from './views/App'

const root = document.getElementById('root')
const render = Component => {
  ReactDOM.hydrate( // 使用 BrowserRouter 包裹组件，使路由生效
    <AppContainer>
      <BrowserRouter>
        <Component/>
      </BrowserRouter>
    </AppContainer>, 
    root
  )
}

render(App)

if (module.hot) {
  // 当热更新后，重新加载 app 文件并 “重新渲染”
  module.hot.accept('./views/App', () => {
      const NextApp = require('./views/App').default
      render(NextApp)
    })
}
