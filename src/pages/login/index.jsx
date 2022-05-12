import { Component } from 'react'
import { Card } from 'antd'
import logo from 'assets/logo.png'
import { Form, Input, Button, Checkbox } from 'antd'
import styles from './index.module.scss'
import { hasToken, setToken } from 'utils/storage'
import { login } from 'api/user'
export default class Login extends Component {
	render() {
		return (
			<div className={styles.login}>
				<Card className='login-container'>
					<img className='logo' src={logo} alt='极客园' />
					<Form
						onFinish={this.onFinish}
						validateTrigger={['onChange', 'onBlur']}
						initialValues={{
							mobile: '13911111111',
							code: '246810',
							agree: true,
						}}
					>
						<Form.Item
							name={'mobile'}
							rules={[
								{
									required: true,
									message: '手机号不能为空',
								},
								{
									pattern: /^1\d{10}$/,
									message: '手机号格式不正确',
								},
							]}
						>
							<Input placeholder='请输入手机号' />
						</Form.Item>
						<Form.Item
							name='code'
							rules={[
								{
									required: true,
									message: '验证码不能为空',
								},
								{
									pattern: /\d{5}$/,
									message: '验证码格式不正确',
								},
							]}
						>
							<Input placeholder='请输入验证码' />
						</Form.Item>
						<Form.Item
							valuePropName='checked'
							name='agree'
							rules={[
								{
									validator: (reule, value) => {
										console.log(value)
										return value
											? Promise.resolve()
											: Promise.reject(
													new Error(
														'请阅读并同意用户协议'
													)
											  )
									},
								},
							]}
						>
							<Checkbox>
								我已阅读并同意[隐私条款]和[用户协议]
							</Checkbox>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								style={{ width: '100%' }}
							>
								登录
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		)
	}
	onFinish = async (value) => {
		try {
			const res = await login(value.mobile, value.code)
			setToken(res.data.token)
			if (hasToken) {
				this.props.history.push('/home')
			}
		} catch (error) {}
	}
	componentDidMount() {}
}
