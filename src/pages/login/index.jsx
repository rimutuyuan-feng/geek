import { Component } from 'react'
import { Card } from 'antd'
import logo from 'assets/logo.png'
import { Form, Input, Button, Checkbox } from 'antd'
import './index.css'
export default class Login extends Component {
	render() {
		return (
			<div className='login'>
				<Card className='login-container'>
					<img className='logo' src={logo} alt='极客园' />
					<Form>
						<Form.Item>
							<Input placeholder='请输入手机号' />
						</Form.Item>
						<Form.Item>
							<Input placeholder='请输入验证码' />
						</Form.Item>
						<Form.Item>
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
}
