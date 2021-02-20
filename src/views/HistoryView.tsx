import { useState } from 'react'
import DoneList from '../doneList'
import { DoneInterval } from '../interfaces'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Styled from 'styled-components/macro'
import { isSameDate, getDates } from 'utils'
import dayjs from 'dayjs'
import Head from 'Head'

interface Props {
	doneIntervals: DoneInterval[]
	updateInterval: (interval: DoneInterval) => void
	deleteInterval: (id: string) => void
}

const StyledCal = Styled(Calendar)`
 	background-color:${(props) => props.theme.light2};
	border-radius: 3px;
	box-shadow: 0 -2px 10px black;
	margin: 1em auto;

`

const HistoryView = ({
	doneIntervals,
	updateInterval,
	deleteInterval,
}: Props) => {
	const [selectedDate, onChangeSelectedDate] = useState<Date>(new Date())
	const availableDates = getDates(doneIntervals.map(({ finished }) => finished))
	const disableTiles = ({ date, view }: { view: any; date: any }): boolean =>
		view === 'month' &&
		!availableDates.find((available) => isSameDate(date, available))
	const daysIntervals = doneIntervals.filter(({ finished }) =>
		isSameDate(finished, selectedDate.toISOString())
	)
	return (
		<>
			<StyledCal
				onChange={(value) =>
					onChangeSelectedDate(Array.isArray(value) ? value[0] : value)
				}
				value={selectedDate}
				tileDisabled={disableTiles}
				maxDate={new Date()}
			/>
			<DoneList
				title={dayjs(selectedDate).format('D.MM.YYYY')}
				doneIntervals={daysIntervals}
				updateInterval={updateInterval}
				deleteInterval={deleteInterval}
			/>
			<Head title='History' />
		</>
	)
}
export default HistoryView
