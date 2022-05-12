import 'antd/dist/antd.css'
import { Route, Switch } from 'react-router-dom'
import LayoutPage from './pages/layout'
import Login from './pages/login'
function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path={'/login'} component={Login} />
				<Route path={'/home'} component={LayoutPage} />
			</Switch>
		</div>
	)
}

export default App
