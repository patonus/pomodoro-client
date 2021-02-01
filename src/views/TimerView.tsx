import DoneList from '../doneList'
import { DoneInterval, Time } from '../interfaces'
import Timer from '../timer'

interface Props {
	addInterval: (finished: string, isWork: boolean) => void
	breakTime: Time
	workTime: Time
	doneIntervals: DoneInterval[]
	updateInterval: (interval: DoneInterval) => void
	deleteInterval: (id: string) => void
}
const TimerView = ({
	addInterval,
	breakTime,
	workTime,
	doneIntervals,
	updateInterval,
	deleteInterval,
}: Props) => {
	return (
		<>
			<Timer onDone={addInterval} breakTime={breakTime} workTime={workTime} />
			<DoneList
				title='Today'
				doneIntervals={doneIntervals}
				updateInterval={updateInterval}
				deleteInterval={deleteInterval}
			/>
		</>
	)
}
export default TimerView
