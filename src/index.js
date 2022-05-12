import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Router } from 'react-router-dom'
import history from 'utils/history'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Router history={history}>
		<ConfigProvider locale={zhCN}>
			<App />
		</ConfigProvider>
	</Router>
)
