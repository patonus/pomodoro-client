import { Time } from '../interfaces'
import { TimerContainer, Clock, LeftButton, RightButton } from './styles'
import { useMachine } from '@xstate/react'
import generateTimerMachine from './stateMachine'
import Head from '../Head'

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

interface Props {
	onDone: (finished: string, isWork: boolean) => void
	breakTime: Time
	workTime: Time
}

const Timer = ({ onDone, breakTime, workTime }: Props) => {
	const [current, send] = useMachine(
		generateTimerMachine(workTime, breakTime, onDone)
	)
	const { elapsed, duration } = current.context
	const timeLeft = duration.subtract(elapsed, 'milliseconds').format('mm:ss')
	const currentState = current.value.toString()
	const isWork = currentState.includes('work')
	return (
		<>
			<TimerContainer isWork={isWork}>
				<Clock>{timeLeft}</Clock>

				<ButtonBar currentState={current.value.toString()} send={send} />
			</TimerContainer>
			<Head time={timeLeft} isWork={isWork} />
		</>
	)
}

export default Timer
