import DoneList from '../doneList'
import { DoneInterval, Config } from '../interfaces'
import Timer from '../timer'

interface Props {
	addInterval: (finished: string, isWork: boolean) => void
	doneIntervals: DoneInterval[]
	updateInterval: (interval: DoneInterval) => void
	deleteInterval: (id: string) => void
	config: Config
}
const TimerView = ({
	addInterval,
	doneIntervals,
	updateInterval,
	deleteInterval,
	config,
}: Props) => {
	return (
		<>
			<Timer onDone={addInterval} config={config} />
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
