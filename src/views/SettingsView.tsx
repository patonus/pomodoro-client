import SettingsForm from 'settingsForm'
import { Config } from 'interfaces'
import Head from 'Head'

interface Props {
	config: Config
	onChangeConfig: (newConfig: Config) => void
}
const SettingsView = ({ config, onChangeConfig }: Props) => {
	return (
		<>
			<SettingsForm config={config} onChangeConfig={onChangeConfig} />
			<Head title='Settings' />
		</>
	)
}

export default SettingsView
