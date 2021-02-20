import dayjs from 'dayjs'
import { Config } from '../interfaces'
import { Machine, assign } from 'xstate'
import { getNow } from 'utils'

const SECONDS = 60
const MILLISECONDS = 1000

interface Pause {
	start: number
	end?: number
}
interface TimerMachineContext {
	elapsed: number
	duration: number
	start?: number
	pauses: Pause[]
	finishedNo: number
}

const generateTimerMachine = (
	config: Config,
	onDone: (finished: string, isWork: boolean) => void
) =>
	Machine<TimerMachineContext>(
		{
			id: 'timer',
			initial: 'work',
			context: {
				elapsed: 0,
				duration: config.workDuration,
				start: 0,
				pauses: [],
				finishedNo: 0,
			},

			states: {
				work: {
					initial: 'initialized',
					states: {
						initialized: {
							entry: 'initializeWork',
							on: {
								START: { target: 'running', actions: 'initializeTimer' },
								SKIP: '#timer.short.initialized',
							},
						},
						running: {
							always: {
								target: 'finished',
								cond: 'timeOut',
								actions: 'incrementFinished',
							},
							on: {
								PAUSE: { target: 'paused', actions: 'startPause' },
								RESET: 'initialized',
								TICK: { actions: 'updateInterval' },
							},
						},
						paused: {
							on: {
								START: { target: 'running', actions: 'endPause' },
								RESET: 'initialized',
							},
						},
						finished: {
							always: [
								{
									actions: 'submitWork',
									target: '#timer.short.initialized',
									cond: ({ finishedNo }) => finishedNo !== config.pomodoroCount,
								},
								{
									actions: 'submitWork',
									target: '#timer.long.initialized',
									cond: ({ finishedNo }) => finishedNo === config.pomodoroCount,
								},
							],
						},
					},
				},
				short: {
					initial: 'initialized',
					states: {
						initialized: {
							entry: 'initializeShortBreak',
							on: {
								START: { target: 'running', actions: 'initializeTimer' },
								SKIP: '#timer.work.initialized',
							},
						},
						running: {
							always: {
								target: 'finished',
								cond: 'timeOut',
							},
							on: {
								PAUSE: { target: 'paused', actions: 'startPause' },
								RESET: 'initialized',
								TICK: { actions: 'updateInterval' },
							},
						},
						paused: {
							on: {
								START: { target: 'running', actions: 'endPause' },
								RESET: 'initialized',
							},
						},
						finished: {
							always: {
								target: '#timer.work.initialized',
								actions: 'submitBreak',
							},
						},
					},
				},
				long: {
					initial: 'initialized',
					states: {
						initialized: {
							entry: 'initializeLongBreak',
							on: {
								START: { target: 'running', actions: 'initializeTimer' },
								SKIP: {
									target: '#timer.work.initialized',
									actions: 'skipLongBreak',
								},
							},
						},
						running: {
							always: {
								target: 'finished',
								cond: 'timeOut',
							},
							on: {
								PAUSE: { target: 'paused', actions: 'startPause' },
								RESET: 'initialized',
								TICK: { actions: 'updateInterval' },
							},
						},
						paused: {
							on: {
								START: { target: 'running', actions: 'endPause' },
								RESET: 'initialized',
							},
						},
						finished: {
							always: {
								target: '#timer.work.initialized',
								actions: 'submitBreak',
							},
						},
					},
				},
			},
		},
		{
			actions: {
				startPause: assign(({ pauses }) => ({
					pauses: [...pauses, { start: getNow() }],
				})),
				endPause: assign(({ pauses }) => {
					const copyPauses = [...pauses]
					const active = copyPauses.pop()!
					const ended = { ...active, end: getNow() }
					return { pauses: [...copyPauses, ended] }
				}),

				initializeWork: assign((_context) => ({
					duration: config.workDuration,
					elapsed: 0,
					pauses: [],
					start: 0,
				})),

				initializeShortBreak: assign((_context) => ({
					duration: config.shortBreakDuration,
					elapsed: 0,
					pauses: [],
					start: 0,
				})),
				initializeLongBreak: assign((_context) => ({
					duration: config.longBreakDuration,
					elapsed: 0,
					pauses: [],
					start: 0,
				})),

				initializeTimer: assign((_context) => ({ start: getNow() })),

				updateInterval: assign(({ start, pauses }) => ({
					elapsed:
						getNow() -
						start! -
						pauses.reduce((sum, { start, end }) => sum + (end! - start), 0),
				})),
				submitWork: () => {
					onDone(dayjs().format(), true)
				},
				incrementFinished: assign(({ finishedNo }) => {
					return { finishedNo: finishedNo + 1 }
				}),
				submitBreak: () => {
					onDone(dayjs().format(), false)
				},
				submitLongBreak: assign((_context) => {
					onDone(dayjs().format(), false)
					return { finishedNo: 0 }
				}),
				skipLongBreak: assign((_context) => ({ finishedNo: 0 })),
			},
			guards: {
				timeOut: ({ elapsed, duration }) => {
					return elapsed >= duration * SECONDS * MILLISECONDS
				},
			},
		}
	)

export default generateTimerMachine
