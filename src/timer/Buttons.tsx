import { LeftButton, RightButton } from './styles'

interface ButtonProps {
	send: (action: string) => void
}

const StartButton = ({ send }: ButtonProps) => (
	<LeftButton onClick={() => send('START')}>Start</LeftButton>
)
const ResumeButton = ({ send }: ButtonProps) => (
	<LeftButton onClick={() => send('START')}>Resume</LeftButton>
)
const PauseButton = ({ send }: ButtonProps) => (
	<LeftButton onClick={() => send('PAUSE')}>Pause</LeftButton>
)
const ResetButton = ({ send }: ButtonProps) => (
	<RightButton onClick={() => send('RESET')}>Reset</RightButton>
)
const SkipButton = ({ send }: ButtonProps) => (
	<RightButton onClick={() => send('SKIP')}>Skip</RightButton>
)
const BeginButtons = (props: any) => (
	<>
		<StartButton {...props} />
		<SkipButton {...props} />
	</>
)
const RunningButtons = (props: any) => (
	<>
		<PauseButton {...props} />
		<ResetButton {...props} />
	</>
)
const StopButtons = (props: any) => (
	<>
		<ResumeButton {...props} />
		<ResetButton {...props} />
	</>
)

interface ButtonBarProps {
	currentState: string
	[props: string]: any
}
const ButtonBar = ({ currentState, ...props }: ButtonBarProps) => {
	switch (currentState) {
		case 'workBegin':
		case 'breakBegin':
			return <BeginButtons {...props} />

		case 'workRunning':
		case 'breakRunning':
			return <RunningButtons {...props} />

		case 'workPaused':
		case 'breakPaused':
			return <StopButtons {...props} />
		default:
			return <div />
	}
}
export default ButtonBar
