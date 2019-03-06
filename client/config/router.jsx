import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ToppicList from '../views/toppicList/index.jsx'
import ToppicDetail from '../views/toppicDetail/index.jsx'

export default () => [ // exact 让路由精准识别, Redirect设置默认路由
	<Route key="1" path="/" render = {() => <Redirect to="/topList" />} exact />,
	<Route key="2" path="/topList" component={ToppicList} />,
	<Route key="3" path="/detail" component={ToppicDetail} />
]
