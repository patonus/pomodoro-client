import { useState } from 'react'
import DoneList from './doneList'
import Timer from './timer'
import { DoneInterval } from './interfaces'

const breakTime = { minutes: 0, seconds: 5 }
const workTime = { minutes: 0, seconds: 3 }

const TimerView = () => {
	const [doneIntervals, setDoneIntervals] = useState<DoneInterval[]>([])

	const addInterval = (finished: string, isWork: boolean) => {
		const newInterval: DoneInterval = {
			id: finished,
			isWork: isWork,
			duration: isWork ? workTime : breakTime,
			finished: finished,
			note: '',
		}
		setDoneIntervals((i) => [...i, newInterval])
	}
	const updateInterval = (newInterval: DoneInterval) => {
		setDoneIntervals((intervals) => [
			...intervals.filter((i) => i.id !== newInterval.id),
			newInterval,
		])
	}
	const deleteInterval = (id: string) => {
		setDoneIntervals((intervals) => intervals.filter((i) => i.id !== id))
	}

	return (
		<>
			<Timer onDone={addInterval} breakTime={breakTime} workTime={workTime} />
			<DoneList
				doneIntervals={doneIntervals}
				updateInterval={updateInterval}
				deleteInterval={deleteInterval}
			/>
		</>
	)
}
export default TimerView
