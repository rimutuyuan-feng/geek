import { Component } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import {
	LogoutOutlined,
	FileTextOutlined,
	EditOutlined,
} from '@ant-design/icons'
const { Header, Content, Sider } = Layout

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	}
}
const items = [
	getItem('数据概览', '1', <HomeOutlined />),
	getItem('内容管理', '2', <FileTextOutlined />),
	getItem('发布文章', '3', <EditOutlined />),
]
export default class LayoutPage extends Component {
	render() {
		return (
			<Layout className={styles.container}>
				<Header className='header'>
					<div className='logo' />
					<div className='profile'>
						<span>你好</span>
						<span>
							<LogoutOutlined /> 退出
						</span>
					</div>
				</Header>
				<Layout>
					<Sider width={200}>
						<Menu theme='dark' mode='inline' items={items} />
					</Sider>
					<Layout
						style={{
							padding: '24px',
						}}
					>
						<Content className='site-layout-background'>
							Content
						</Content>
					</Layout>
				</Layout>
			</Layout>
		)
	}
}
