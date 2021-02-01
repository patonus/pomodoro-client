import { Time } from '../interfaces'
import { TimerContainer, Clock } from './styles'
import { useMachine } from '@xstate/react'
import generateTimerMachine from './stateMachine'
import Head from '../Head'
import ButtonBar from './Buttons'

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
