/*
 * @Author: riddle 482825911@qq.com
 * @Date: 2022-05-09 14:09:10
 * @LastEditors: riddle 482825911@qq.com
 * @LastEditTime: 2022-05-11 23:06:55
 * @FilePath: \geek\src\App.js
 * @Description:
 */
import 'antd/dist/antd.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './pages/layout'
import Login from './pages/login'
function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path={'/login'} component={Login} />
				<Route path={'/home'} component={Layout} />
			</Switch>
		</div>
	)
}

export default App
