import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import GlobalStyle, { muiTheme, styledComponentsTheme } from './globalStyle'
import {
	ThemeProvider as ThemeProviderMui,
	StylesProvider,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import TimerView from './views/TimerView'
import Header from './header'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SettingsView from './views/SettingsView'
import HistoryView from './views/HistoryView'
import { DoneInterval } from './interfaces'
import { isSameDate } from './utils'
import useLocalStorage from './useLocalStorage'

const defaultConfig = {
	volume: 100,
	workDuration: 25,
	shortBreakDuration: 5,
	longBreakDuration: 20,
	pomodoroCount: 4,
}

const App = () => {
	const [doneIntervals, setDoneIntervals] = useLocalStorage('intervals', [])

	const [config, setConfig] = useLocalStorage('config', defaultConfig)

	const addInterval = (finished: string, isWork: boolean) => {
		const newInterval: DoneInterval = {
			id: finished,
			isWork: isWork,
			duration: isWork ? config.workDuration : config.shortBreakDuration,
			finished: finished,
			note: '',
		}
		setDoneIntervals((i: DoneInterval[]) => [...i, newInterval])
	}
	const updateInterval = (newInterval: DoneInterval) => {
		setDoneIntervals((intervals: DoneInterval[]) => [
			...intervals.filter((i) => i.id !== newInterval.id),
			newInterval,
		])
	}
	const deleteInterval = (id: string) => {
		setDoneIntervals((intervals: DoneInterval[]) =>
			intervals.filter((i) => i.id !== id)
		)
	}
	return (
		<HelmetProvider>
			<StylesProvider injectFirst>
				<ThemeProviderMui theme={muiTheme}>
					<GlobalStyle />
					<ThemeProvider theme={styledComponentsTheme}>
						<CssBaseline />
						<BrowserRouter>
							<Header />
							<Switch>
								<Route exact path='/'>
									<TimerView
										addInterval={addInterval}
										config={config}
										doneIntervals={doneIntervals.filter(
											({ finished }: DoneInterval) => isSameDate(finished)
										)}
										updateInterval={updateInterval}
										deleteInterval={deleteInterval}
									/>
								</Route>
								<Route path='/settings'>
									<SettingsView config={config} onChangeConfig={setConfig} />
								</Route>
								<Route path='/history'>
									<HistoryView
										doneIntervals={doneIntervals}
										updateInterval={updateInterval}
										deleteInterval={deleteInterval}
									/>
								</Route>
							</Switch>
						</BrowserRouter>
					</ThemeProvider>
				</ThemeProviderMui>
			</StylesProvider>
		</HelmetProvider>
	)
}
export default App
