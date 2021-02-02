import { useEffect } from 'react'
import { Time } from '../interfaces'
import { TimerContainer, Clock } from './styles'
import { useMachine } from '@xstate/react'
import generateTimerMachine from './stateMachine'
import Head from '../Head'
import ButtonBar from './Buttons'
import useSound from 'use-sound'
import notifySound from 'assets/notify.mp3'
interface Props {
	onDone: (finished: string, isWork: boolean) => void
	breakTime: Time
	workTime: Time
}

const Timer = ({ onDone, breakTime, workTime }: Props) => {
	const [playSound] = useSound(notifySound, { volume: 1 })

	const [current, send] = useMachine(
		generateTimerMachine(workTime, breakTime, onDone)
	)
	const { elapsed, duration } = current.context
	const currentState = current.value.toString()
	const isWork = currentState.includes('work')
	const timeLeft = duration.subtract(elapsed, 'milliseconds').format('mm:ss')
	useEffect(() => {
		current.actions.filter(({ type }) => type.includes('submit')).length &&
			playSound()
	}, [current, playSound])
	return (
		<>
			<TimerContainer isWork={isWork}>
				<Clock>{timeLeft}</Clock>
				<ButtonBar currentState={currentState} send={send} />
			</TimerContainer>
			<Head time={timeLeft} isWork={isWork} />
		</>
	)
}

export default Timer
