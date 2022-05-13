import { Component } from 'react'
import {
	Breadcrumb,
	Card,
	Form,
	Radio,
	Button,
	DatePicker,
	Table,
	Image,
	Tag,
	Space,
	Modal,
	message,
} from 'antd'
import statusInfo from 'utils/status'
import { deleteArticle, getArticles } from 'api/article'
import defaultImg from 'assets/error.png'
import {
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons'
import Channel from 'components/Channel'
export default class ArticleList extends Component {
	columns = [
		{
			title: '封面',
			dataIndex: 'cover',
			key: 'cover',
			render: (cover) => {
				if (cover.type === 0) {
					return (
						<Image src={defaultImg} width='200px' height='100px' />
					)
				} else {
					return (
						<Image
							src={cover.images[0]}
							width='200px'
							height='100px'
							fallback={defaultImg}
						/>
					)
				}
			},
		},
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag color={statusInfo[status].color}>
					{statusInfo[status].type}
				</Tag>
			),
		},
		{
			title: '发布时间',
			dataIndex: 'pubdate',
			key: 'pubdate',
		},
		{
			title: '阅读数',
			dataIndex: 'read_count',
			key: 'read_count',
		},
		{
			title: '评论数',
			dataIndex: 'comment_count',
			key: 'comment_count',
		},
		{
			title: '点赞数',
			dataIndex: 'like_count',
			key: 'like_count',
		},
		{
			title: '操作',
			render: (article) => {
				return (
					<Space>
						<Button
							type='primary'
							shape='circle'
							icon={<EditOutlined />}
						></Button>
						<Button
							type='primary'
							shape='circle'
							danger
							icon={<DeleteOutlined />}
							onClick={() => {
								this.handleDelete(article.id)
							}}
						></Button>
					</Space>
				)
			},
		},
	]
	state = { articles: [], total: 0 }
	reqParams = { page: 1, per_page: 10 }
	render() {
		return (
			<div className='list'>
				<Card
					size='small'
					title={
						<Breadcrumb separator='>'>
							<Breadcrumb.Item>首页</Breadcrumb.Item>
							<Breadcrumb.Item>内容管理</Breadcrumb.Item>
						</Breadcrumb>
					}
					style={{ width: '100%', marginBottom: '20px' }}
				>
					<Form
						onFinish={this.onFinish}
						initialValues={{ status: -1 }}
					>
						<Form.Item label='状态' name='status'>
							<Radio.Group>
								<Radio value={-1}>全部</Radio>
								<Radio value={0}>草稿</Radio>
								<Radio value={1}>待审核</Radio>
								<Radio value={2}>审核通过</Radio>
								<Radio value={3}>审核失败</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item label='频道' name='channel_id'>
							<Channel />
						</Form.Item>
						<Form.Item label='日期' name='data'>
							<DatePicker.RangePicker />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								筛选
							</Button>
						</Form.Item>
					</Form>
				</Card>
				<Card
					size='small'
					title={`根据筛选条件共查询到${this.state.total}条结果：`}
				>
					<Table
						rowKey='id'
						columns={this.columns}
						dataSource={this.state.articles}
						pagination={{
							total: this.state.total,
							onChange: async (page, pageSize) => {
								this.reqParams.page = page
								this.reqParams.per_page = pageSize
								this.getArticlesList(this.reqParams)
							},
						}}
					/>
				</Card>
			</div>
		)
	}
	onFinish = (values) => {
		if (values.status !== -1) {
			this.reqParams.status = values.status
		} else {
			delete this.reqParams.status
		}
		if (values.channel_id !== undefined) {
			this.reqParams.channel_id = values.channel_id
		} else {
			delete this.reqParams.channel_id
		}
		if (values.data) {
			this.reqParams.begin_pubdate = values.data[0].format('YYYY-MM-DD')
			this.reqParams.end_pubdate = values.data[1].format('YYYY-MM-DD')
		} else {
			delete this.reqParams.begin_pubdate
			delete this.reqParams.end_pubdate
		}
		this.getArticlesList(this.reqParams)
	}

	componentDidMount() {
		this.getArticlesList()
	}
	getArticlesList = async (params = {}) => {
		const res = await getArticles(params)
		this.setState({
			articles: res.data.results,
			total: res.data.total_count,
		})
	}
	handleDelete = (id) => {
		Modal.confirm({
			title: '温馨提示？',
			icon: <ExclamationCircleOutlined />,
			content: '你确定要删除文章吗',
			onOk: async () => {
				// 发送请求进行删除
				await deleteArticle(id)
				this.getArticlesList(this.reqParams)
				message.success('删除成功')
			},
		})
	}
}
