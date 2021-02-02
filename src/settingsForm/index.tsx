import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import {
	VolumeSliderContainer,
	InputLabel,
	Icon,
	FormContainer,
	NumberInput,
	ListHeader,
	StyledSlider,
} from './styles'
import { Config } from 'interfaces'
interface Props {
	config: Config
	onChangeConfig: (newConfig: any) => void
}

const SettingsView = ({ config, onChangeConfig }: Props) => {
	const handleChange = (name: string, value: number) =>
		onChangeConfig((config: Config) => ({ ...config, [name]: value }))

	return (
		<FormContainer>
			<ListHeader>Settings:</ListHeader>
			<NumberInput
				name='workDuration'
				label='Work duration'
				type='number'
				variant='outlined'
				fullWidth
				helperText='In minutes'
				inputProps={{ min: '1', max: '120' }}
				required
				value={config.workDuration}
				onChange={({ target: { name, value } }) =>
					handleChange(name, Number(value))
				}
			/>
			<NumberInput
				name='shortBreakDuration'
				label='Short break duration'
				type='number'
				variant='outlined'
				fullWidth
				helperText='In minutes'
				inputProps={{ min: '1', max: '120' }}
				required
				value={config.shortBreakDuration}
				onChange={({ target: { name, value } }) =>
					handleChange(name, Number(value))
				}
			/>
			<NumberInput
				name='longBreakDuration'
				label='Long break duration'
				type='number'
				variant='outlined'
				fullWidth
				helperText='In minutes'
				inputProps={{ min: '1', max: '120' }}
				required
				value={config.longBreakDuration}
				onChange={({ target: { name, value } }) =>
					handleChange(name, Number(value))
				}
			/>
			<NumberInput
				name='pomodoroCount'
				label='Number of pomodoros before long break'
				type='number'
				variant='outlined'
				fullWidth
				inputProps={{ min: '1', max: '100' }}
				required
				value={config.pomodoroCount}
				onChange={({ target: { name, value } }) =>
					handleChange(name, Number(value))
				}
			/>

			<hr />
			<InputLabel>Notification volume</InputLabel>
			<VolumeSliderContainer>
				<Icon>
					<BsFillVolumeMuteFill />
				</Icon>
				<StyledSlider
					name='volume'
					onChange={(_e, newValue) => handleChange('volume', Number(newValue))}
					value={config.volume}
				/>
				<Icon>
					<BsFillVolumeUpFill />
				</Icon>
			</VolumeSliderContainer>
		</FormContainer>
	)
}

export default SettingsView
