export interface DoneInterval {
	id: string
	duration: number
	finished: string
	note: string
	isWork: boolean
}

export interface Config {
	volume: number
	workDuration: number
	shortBreakDuration: number
	longBreakDuration: number
	pomodoroCount: number
}
