import { DoneInterval } from '../interfaces'
import {
	FinishedContainer,
	RecordHeader,
	TrashButton,
	DateTime,
	Icon,
	DurationLabelContainer,
	ListHeader,
} from './styles'
import { FaTrash, FaCoffee } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi'
import TextField from '@material-ui/core/TextField'
import dayjs from 'dayjs'

interface Props {
	doneIntervals: DoneInterval[]
	updateInterval: (newInterval: DoneInterval) => void
	deleteInterval: (id: string) => void
}
const formatDate = (date: string) => dayjs(date).format('HH:mm D.MM.YY')

const sortListFromNewest = (intervals: DoneInterval[]) =>
	intervals.sort((a, b) => a.finished.localeCompare(b.finished)).reverse()

const DoneList = ({ doneIntervals, updateInterval, deleteInterval }: Props) => {
	return (
		<>
			<ListHeader>Done</ListHeader>
			{sortListFromNewest(doneIntervals).map((interval) => (
				<FinishedContainer key={interval.id}>
					<RecordHeader>
						<DurationLabelContainer>
							<Icon>{interval.isWork ? <GiReceiveMoney /> : <FaCoffee />}</Icon>
							<DateTime>{interval.duration.minutes + 'm'}</DateTime>
						</DurationLabelContainer>
						<DateTime>{formatDate(interval.finished)}</DateTime>
						<TrashButton onClick={() => deleteInterval(interval.id)}>
							<FaTrash />
						</TrashButton>
					</RecordHeader>
					{interval.isWork ? (
						<TextField
							label='Description'
							fullWidth
							margin='normal'
							multiline
							variant='outlined'
							onBlur={(e) =>
								updateInterval({ ...interval, note: e.target.value })
							}
						/>
					) : null}
				</FinishedContainer>
			))}
		</>
	)
}
export default DoneList