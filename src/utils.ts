import dayjs from 'dayjs'

export const isSameDate = (dateToCompare: string, baseDate?: string) =>
	dayjs(baseDate).isSame(dayjs(dateToCompare), 'day')

export const getDates = (dateTimes: string[]) => [
	...new Set(dateTimes.map((dt) => dayjs(dt).format('YYYY-MM-DD'))),
]
