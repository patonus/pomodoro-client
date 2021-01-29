import dayjs from 'dayjs'
import { Time } from '../interfaces'
import { Machine, assign } from 'xstate'
import * as workerTimers from 'worker-timers'

const REFRESH_RATE = 1000

const generateTimerMachine = (
	workTime: Time,
	breakTime: Time,
	onDone: (finished: string, isWork: boolean) => void
) =>
	Machine(
		{
			id: 'timer',
			initial: 'workBegin',
			context: {
				elapsed: 0,
				interval: REFRESH_RATE,
				duration: dayjs.duration(workTime),
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
					invoke: {
						src: (context) => (callback) => {
							const interval = workerTimers.setInterval(() => {
								callback('TICK')
							}, context.interval)

							return () => {
								workerTimers.clearInterval(interval)
							}
						},
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
						target: 'workBegin',
						cond: 'timeOut',
						actions: 'submitBreak',
					},
					invoke: {
						src: (context) => (send) => {
							const interval = workerTimers.setInterval(() => {
								send('TICK')
							}, context.interval)

							return () => {
								workerTimers.clearInterval(interval)
							}
						},
					},
					on: {
						PAUSE: 'breakPaused',
						RESET: 'breakBegin',
						TICK: { actions: 'incrementElapsed' },
					},
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
					// start: dayjs(),
					duration: dayjs.duration(workTime),
					elapsed: 0,
				})),
				initializeBreak: assign((_context) => ({
					// start: dayjs(),

					duration: dayjs.duration(breakTime),
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
				timeOut: ({ elapsed, duration, start }) => {
					console.log(dayjs().diff(start))
					return elapsed >= duration.asMilliseconds()
				},
			},
		}
	)

export default generateTimerMachine
