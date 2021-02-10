import { useEffect } from 'react'
import { Config } from '../interfaces'
import { TimerContainer, Clock } from './styles'
import { useMachine } from '@xstate/react'
import generateTimerMachine from './stateMachine'
import Head from '../Head'
import ButtonBar from './Buttons'
import useSound from 'use-sound'
import notifySound from 'assets/notify.mp3'
import useLocalStorage from 'useLocalStorage'
import dayjs from 'dayjs'
import * as workerTimers from 'worker-timers'

interface Props {
	onDone: (finished: string, isWork: boolean) => void
	config: Config
}

const Timer = ({ onDone, config }: Props) => {
	const [playSound] = useSound(notifySound, { volume: config.volume / 100 })

	const [persistedState, setPersistedState] = useLocalStorage(
		'timer-state',
		null
	)

	const [current, send] = useMachine(generateTimerMachine(config, onDone), {
		state: persistedState ? { ...persistedState, actions: [] } : null,
	})
	useEffect(() => {
		setPersistedState(current)
	}, [setPersistedState, current])

	const { elapsed, duration } = current.context
	useEffect(() => {
		const timer = workerTimers.setInterval(() => {
			send('TICK')
		}, 500)
		return () => {
			workerTimers.clearInterval(timer)
		}
	}, [send])

	const currentState = current.value.toString()
	const isWork = currentState.includes('work')
	const timeLeft = dayjs
		.duration(duration * 60 * 1000 - elapsed)
		.format('mm:ss')
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
