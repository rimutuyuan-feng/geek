import 'antd/dist/antd.css'
import { Route, Switch } from 'react-router-dom'
import LayoutPage from './pages/Layout'
import Login from './pages/Login'
import AuthRoute from 'components/AuthRoute'
function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path={'/login'} component={Login} />
				<AuthRoute path={'/home'} component={LayoutPage} />
			</Switch>
		</div>
	)
}

export default App
