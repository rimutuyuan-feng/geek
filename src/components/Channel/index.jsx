import { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channels'
const { Option } = Select
export default class Channel extends Component {
	state = {
		channels: [],
	}
	render() {
		return (
			<Select
				placeholder='请选择文章频道'
				style={{ width: 200 }}
				{...this.props}
			>
				{this.state.channels.map((channel) => (
					<Option key={channel.id} value={channel.id}>
						{channel.name}
					</Option>
				))}
			</Select>
		)
	}
	async componentDidMount() {
		const res = await getChannels()
		this.setState({ channels: res.data.channels })
	}
}
