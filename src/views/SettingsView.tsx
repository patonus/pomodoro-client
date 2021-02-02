import SettingsForm from 'settingsForm'
import { Config } from 'interfaces'
interface Props {
	config: Config
	onChangeConfig: (newConfig: Config) => void
}
const SettingsView = ({ config, onChangeConfig }: Props) => {
	return <SettingsForm config={config} onChangeConfig={onChangeConfig} />
}

export default SettingsView
