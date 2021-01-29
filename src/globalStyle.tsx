import { createGlobalStyle } from 'styled-components'
import { createMuiTheme } from '@material-ui/core/styles'

const GlobalStyle = createGlobalStyle`
  body {
 
    background: #313131;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`
export const styledComponentsTheme = {
	dark: '#140F2D',
	light: '#DBB4AD',
	light2: '#7B9EA8',
	accent: '#D81E5B',
}
export default GlobalStyle

export const muiTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})
