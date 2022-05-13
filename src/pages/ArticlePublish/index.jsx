import {
	Card,
	Breadcrumb,
	Form,
	Input,
	Button,
	Space,
	Radio,
	Upload,
	Modal,
	message,
} from 'antd'
import { addArticle } from 'api/article'
import Channel from 'components/Channel'
import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import { baseUrl } from 'utils/request'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
export default class ArticlePublish extends Component {
	formRef = React.createRef()
	state = {
		type: 1,
		fileList: [],
		previewVisible: false,
		imgUrl: '',
	}
	render() {
		return (
			<div className={styles.publish}>
				<Card
					title={
						<Breadcrumb separator='>'>
							<Breadcrumb.Item>首页</Breadcrumb.Item>
							<Breadcrumb.Item>发布文章</Breadcrumb.Item>
						</Breadcrumb>
					}
					style={{ width: '100%', marginBottom: '20px' }}
				>
					<Form
						labelCol={{ span: 4 }}
						onFinish={this.onFinish}
						initialValues={{ type: this.state.type, content: '' }}
						ref={this.formRef}
					>
						<Form.Item
							label='标题'
							name='title'
							rules={[
								{ required: true, message: '标题不能为空' },
							]}
						>
							<Input
								style={{ width: '400px' }}
								placeholder='请输入文章的标题'
							/>
						</Form.Item>
						<Form.Item
							label='频道'
							name='channel_id'
							rules={[
								{ required: true, message: '频道不能为空' },
							]}
						>
							<Channel />
						</Form.Item>
						<Form.Item label='封面' name='type'>
							<Radio.Group
								onChange={(e) =>
									this.setState({
										type: e.target.value,
										fileList: [],
									})
								}
							>
								<Radio value={1}>单图</Radio>
								<Radio value={3}>三图</Radio>
								<Radio value={0}>无图</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 4 }}>
							{this.state.type ? (
								<Upload
									listType='picture-card'
									fileList={this.state.fileList}
									action={`${baseUrl}upload`}
									name='image'
									onChange={({ fileList }) => {
										this.setState({ fileList: fileList })
									}}
									onPreview={(file) => {
										const url =
											file.url || file.response.data.url
										this.setState({
											previewVisible: true,
											imgUrl: url,
										})
									}}
									beforeUpload={(file) => {
										if (
											![
												'image/jpeg',
												'image/png',
											].includes(file.type)
										) {
											return Upload.LIST_IGNORE
										}
									}}
								>
									{this.state.fileList.length <
										this.state.type && '+'}
								</Upload>
							) : (
								''
							)}
						</Form.Item>
						<Form.Item
							label='内容'
							name='content'
							rules={[
								{ required: true, message: '文章内容为空' },
							]}
						>
							<ReactQuill
								theme='snow'
								placeholder='请输入文章的内容'
							/>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 4 }}>
							<Space>
								<Button type='primary' htmlType='submit'>
									发表文章
								</Button>
								<Button onClick={this.addDraft}>
									存入草稿
								</Button>
							</Space>
						</Form.Item>
					</Form>
					<Modal
						visible={this.state.previewVisible}
						title={'图片预览'}
						onCancel={() => {
							this.setState({ previewVisible: false, imgUrl: '' })
						}}
						footer={null}
					>
						<img
							alt='example'
							style={{ width: '100%' }}
							src={this.state.imgUrl}
						/>
					</Modal>
				</Card>
			</div>
		)
	}
	onSave = async (values, draft) => {
		const images = this.state.fileList.map(
			(file) => file.url || file.response.data.url
		)
		await addArticle(
			{
				...values,
				cover: { type: this.state.type, images: images },
			},
			draft
		)
		message.success('添加成功', 1)
		this.props.history.push('/home/list')
	}
	onFinish = async (values) => {
		this.onSave(values)
	}
	addDraft = async () => {
		const values = await this.formRef.current.validateFields()
		this.onSave(values, true)
	}
}
