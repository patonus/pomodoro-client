import { useEffect } from 'react'
import { Config } from '../interfaces'
import { TimerContainer, Clock } from './styles'
import { useMachine } from '@xstate/react'
import generateTimerMachine from './stateMachine'
import Head from '../Head'
import ButtonBar from './Buttons'
import useSound from 'use-sound'
import notifySound from 'assets/notify.mp3'
interface Props {
	onDone: (finished: string, isWork: boolean) => void
	config: Config
}

const Timer = ({ onDone, config }: Props) => {
	const [playSound] = useSound(notifySound, { volume: config.volume / 100 })

	const [current, send] = useMachine(generateTimerMachine(config, onDone))
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
