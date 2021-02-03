import { useState, useEffect } from 'react'

const useLocalStorage = (name: string, defaultVal: any) => {
	const recordJSON = localStorage.getItem(name)
	const record = recordJSON ? JSON.parse(recordJSON) : defaultVal
	const [recordState, setRecordState] = useState<any>(record)
	useEffect(() => {
		localStorage.setItem(name, JSON.stringify(recordState))
	}, [recordState, name])

	return [recordState, setRecordState]
}

export default useLocalStorage
