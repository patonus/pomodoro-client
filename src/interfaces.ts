export interface Time {
	minutes: number
	seconds: number
}

export interface DoneInterval {
	id: string
	duration: Time
	finished: string
	note: string
	isWork: boolean
}
