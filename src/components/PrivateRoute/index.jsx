import { Component } from 'react'
import { hasToken } from 'utils/storage'
import { Route, Redirect } from 'react-router-dom'
export default class PrivateRoute extends Component {
	render() {
		const { component: Component, ...rest } = this.props
		return (
			<Route
				{...rest}
				render={(routerProps) => {
					if (hasToken()) {
						return <Component {...routerProps} />
					} else {
						return (
							<Redirect
								to={{
									pathname: '/login',
									state: {
										from: routerProps.location.pathname,
									},
								}}
							/>
						)
					}
				}}
			></Route>
		)
	}
}
