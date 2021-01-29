import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import GlobalStyle, { muiTheme, styledComponentsTheme } from './globalStyle'
import {
	ThemeProvider as ThemeProviderMui,
	StylesProvider,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import TimerView from './TimerView'

const App = () => {
	return (
		<HelmetProvider>
			<StylesProvider injectFirst>
				<ThemeProviderMui theme={muiTheme}>
					<GlobalStyle />
					<ThemeProvider theme={styledComponentsTheme}>
						<CssBaseline />
						<TimerView />
					</ThemeProvider>
				</ThemeProviderMui>
			</StylesProvider>
		</HelmetProvider>
	)
}
export default App
