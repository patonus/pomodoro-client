import dayjs from 'dayjs'
import { Config } from '../interfaces'
import { Machine, assign } from 'xstate'

const REFRESH_RATE = 1000
const SECONDS = 60
const MILLISECONDS = 1000

const generateTimerMachine = (
	config: Config,
	onDone: (finished: string, isWork: boolean) => void
) =>
	Machine(
		{
			id: 'timer',
			initial: 'workBegin',
			context: {
				elapsed: 0,
				interval: REFRESH_RATE,
				duration: config.workDuration,
				start: dayjs(),
			},

			states: {
				workBegin: {
					entry: 'initializeWork',
					on: {
						START: 'workRunning',
						SKIP: 'breakBegin',
					},
				},
				workRunning: {
					entry: 'initializeTimer',

					always: {
						target: 'breakBegin',
						cond: 'timeOut',
						actions: 'submitWork',
					},

					on: {
						PAUSE: 'workPaused',
						RESET: 'workBegin',
						TICK: { actions: 'incrementElapsed' },
					},
				},
				workPaused: {
					on: {
						START: 'workRunning',
						RESET: 'workBegin',
					},
				},
				breakBegin: {
					entry: 'initializeBreak',

					on: {
						START: 'breakRunning',
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
						TICK: { actions: 'incrementElapsed' },
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
			},
		},
		{
			actions: {
				initializeWork: assign((_context) => ({
					duration: config.workDuration,
					elapsed: 0,
				})),
				initializeBreak: assign((_context) => ({
					duration: config.shortBreakDuration,
					elapsed: 0,
				})),
				initializeTimer: assign((_context) => ({ start: dayjs() })),
				incrementElapsed: assign(({ elapsed, interval }) => {
					console.log('tick')
					return {
						elapsed: elapsed + interval,
					}
				}),
				submitWork: () => {
					onDone(dayjs().format(), true)
				},
				submitBreak: () => {
					onDone(dayjs().format(), false)
				},
			},
			guards: {
				timeOut: ({ elapsed, duration }) => {
					return elapsed >= duration * SECONDS * MILLISECONDS
				},
			},
		}
	)

export default generateTimerMachine
