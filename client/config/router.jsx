import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import ToppicList from '../views/toppicList/index.jsx'
import ToppicDetail from '../views/toppicDetail/index.jsx'

export default () => { // exact 让路由精准识别, Redirect设置默认路由
	<Route path="/" render = {() => <Redirect to="/list" />} exact />,
	<Route path="/list" component={ToppicList} />,
	<Route path="/detail" component={ToppicDetail} />
}
