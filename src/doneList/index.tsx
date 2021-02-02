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
	title: string
}
const formatDate = (date: string) => dayjs(date).format('HH:mm D.MM.YY')

const sortListFromNewest = (intervals: DoneInterval[]) =>
	intervals.sort((a, b) => a.finished.localeCompare(b.finished)).reverse()
interface DoneItemProps {
	interval: DoneInterval
	onUpdate: (newInterval: DoneInterval) => void
	onDelete: (id: string) => void
}
const DoneItem = ({ interval, onUpdate, onDelete }: DoneItemProps) => (
	<FinishedContainer key={interval.id}>
		<RecordHeader>
			<DurationLabelContainer>
				<Icon>{interval.isWork ? <GiReceiveMoney /> : <FaCoffee />}</Icon>
				<DateTime>{interval.duration + 'm'}</DateTime>
			</DurationLabelContainer>
			<DateTime>{formatDate(interval.finished)}</DateTime>
			<TrashButton onClick={() => onDelete(interval.id)}>
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
				onBlur={(e) => onUpdate({ ...interval, note: e.target.value })}
			/>
		) : null}
	</FinishedContainer>
)

const DoneList = ({
	doneIntervals,
	updateInterval,
	deleteInterval,
	title,
}: Props) => {
	return (
		<>
			<ListHeader>{title}</ListHeader>

			{sortListFromNewest(doneIntervals).map((interval) => (
				<DoneItem
					key={interval.id}
					interval={interval}
					onUpdate={updateInterval}
					onDelete={deleteInterval}
				/>
			))}
		</>
	)
}
export default DoneList
