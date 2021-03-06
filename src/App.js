import 'antd/dist/antd.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import LayoutPage from './pages/Layout'
import Login from './pages/Login'
import PrivateRoute from 'components/PrivateRoute'
function App() {
	return (
		<div className='App'>
			<Switch>
				<Redirect exact from='/' to='/home' />
				<Route path={'/login'} component={Login} />
				<PrivateRoute path={'/home'} component={LayoutPage} />
			</Switch>
		</div>
	)
}

export default App
