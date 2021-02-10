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
			initial: 'workBegin',
			context: {
				elapsed: 0,
				duration: config.workDuration,
				start: 0,
				pauses: [],
				finishedNo: 0,
			},

			states: {
				workBegin: {
					entry: 'initializeWork',
					on: {
						START: { target: 'workRunning', actions: 'initializeTimer' },
						SKIP: 'breakBegin',
					},
				},
				workRunning: {
					always: {
						target: 'workFinished',
						cond: 'timeOut',
						actions: 'submitWork',
					},

					on: {
						PAUSE: { target: 'workPaused', actions: 'startPause' },
						RESET: 'workBegin',
						TICK: { actions: 'updateInterval' },
					},
				},
				workFinished: {
					always: [
						{
							target: 'breakBegin',
							cond: ({ finishedNo }) => finishedNo !== config.pomodoroCount,
						},
						{
							target: 'longBreakBegin',
							cond: ({ finishedNo }) => finishedNo === config.pomodoroCount,
						},
					],
				},
				workPaused: {
					on: {
						START: { target: 'workRunning', actions: 'endPause' },
						RESET: 'workBegin',
					},
				},
				breakBegin: {
					entry: 'initializeBreak',
					on: {
						START: { target: 'breakRunning', actions: 'initializeTimer' },
						SKIP: 'workBegin',
					},
				},
				breakRunning: {
					always: {
						target: 'breakFinished',
						cond: 'timeOut',
					},

					on: {
						PAUSE: 'breakPaused',
						RESET: 'breakBegin',
						TICK: { actions: 'updateInterval' },
					},
				},
				breakFinished: {
					always: { target: 'workBegin', actions: 'submitBreak' },
				},
				breakPaused: {
					on: {
						START: 'breakRunning',
						RESET: 'breakBegin',
					},
				},
				longBreakBegin: {
					entry: 'initializeLongBreak',
					on: {
						START: { target: 'longBreakRunning', actions: 'initializeTimer' },
						SKIP: { target: 'workBegin', actions: 'resetFinishedCount' },
					},
				},
				longBreakRunning: {
					always: {
						target: 'longBreakFinished',
						cond: 'timeOut',
					},

					on: {
						PAUSE: 'longBreakPaused',
						RESET: 'longBreakBegin',
						TICK: { actions: 'updateInterval' },
					},
				},
				longBreakFinished: {
					always: { target: 'workBegin', actions: 'submitLongBreak' },
				},
				longBreakPaused: {
					on: {
						START: 'longBreakRunning',
						RESET: 'longBreakBegin',
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

				initializeBreak: assign((_context) => ({
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

				submitWork: assign(({ finishedNo }) => {
					onDone(dayjs().format(), true)
					return { finishedNo: finishedNo + 1 }
				}),
				submitBreak: () => {
					onDone(dayjs().format(), false)
				},
				submitLongBreak: assign((_context) => {
					onDone(dayjs().format(), true)
					return { finishedNo: 0 }
				}),
			},
			guards: {
				timeOut: ({ elapsed, duration }) => {
					return elapsed >= duration * SECONDS * MILLISECONDS
				},
			},
		}
	)

export default generateTimerMachine
