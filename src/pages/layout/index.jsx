import { Component } from 'react'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Switch, Route, Link } from 'react-router-dom'
import Home from 'pages/Home'
import ArticlePublish from 'pages/ArticlePublish'
import ArticleList from 'pages/ArticleList'
import {
	LogoutOutlined,
	FileTextOutlined,
	EditOutlined,
} from '@ant-design/icons'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'
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
	getItem(<Link to='/home'>数据概览</Link>, '/home', <HomeOutlined />),
	getItem(
		<Link to='/home/list'>内容管理</Link>,
		'/home/list',
		<FileTextOutlined />
	),
	getItem(
		<Link to='/home/publish'>发布文章</Link>,
		'/home/publish',
		<EditOutlined />
	),
]
export default class LayoutPage extends Component {
	state = {
		profile: {},
		selectedKey: this.props.location.pathname,
	}
	render() {
		return (
			<Layout className={styles.container}>
				<Header className='header'>
					<div className='logo' />
					<div className='profile'>
						<span>{this.state.profile.name}</span>
						<span>
							<Popconfirm
								title='确认退出登录？'
								onConfirm={this.confirm}
								okText='确认'
								cancelText='取消'
							>
								<LogoutOutlined /> 退出
							</Popconfirm>
						</span>
					</div>
				</Header>
				<Layout>
					<Sider width={200}>
						<Menu
							theme='dark'
							mode='inline'
							items={items}
							selectedKeys={[this.state.selectedKey]}
						/>
					</Sider>
					<Layout
						style={{
							padding: '24px',
						}}
					>
						<Content className='site-layout-background'>
							<Switch>
								<Route exact path='/home' component={Home} />
								<Route
									path='/home/list'
									component={ArticleList}
								/>
								<Route
									exact
									path='/home/publish'
									component={ArticlePublish}
									key='add'
								/>
								<Route
									path='/home/publish/:id'
									component={ArticlePublish}
									key='edit'
								/>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		)
	}
	confirm = () => {
		removeToken()
		this.props.history.push('/login')
		message.success('退出成功', 1)
	}
	async componentDidMount() {
		const { data: user } = await getUserProfile()
		this.setState({ profile: user })
	}
	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			this.setState({
				selectedKey: /^\/home\/publish/.test(
					this.props.location.pathname
				)
					? '/home/publish'
					: this.props.location.pathname,
			})
		}
	}
}
