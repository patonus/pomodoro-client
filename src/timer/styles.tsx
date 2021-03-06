import Styled from 'styled-components/macro'

export const TimerContainer = Styled.div<{ isWork: boolean }>`
	background-color:${({ isWork, theme: { accent, light2 } }) =>
		isWork ? accent : light2};
	display: grid;
   	grid-template-columns: 1fr 1fr;
   	grid-template-areas:
   	"clock clock"
   	"start stop";
   	max-width:800px;
	margin: 0 auto 0.5em auto; 
   	row-gap:0.2em;
	border-radius: 3px;
	box-shadow: 0 -2px 10px black;
	@media (max-width: 800px) {
		max-width:500px;

  }
`

export const Clock = Styled.div`
	grid-area: clock;
	font-size: 8rem;
	justify-self: center;
	@media (max-width: 800px) {
		font-size: 5rem;

  }
`
export const TimerButton = Styled.button`
	display:inline-block;
 	padding:0.5em 1.2em;
 	border:0.1em solid ${(props) => props.theme.dark};
 	margin:0 0.3em 0.3em 0.3em;
 	border-radius:0.12em;
 	box-sizing: border-box;
 	text-decoration:none;
 	font-family:'Roboto',sans-serif;
 	font-weight:600;
	font-size: 1.5rem;
 	color:#FFFFFF;
 	text-align:center;
 	transition: all 0.2s;
	background-color: ${(props) => props.theme.dark};
	&:hover{
		color:${(props) => props.theme.dark};
 		background-color:#FFFFFF;
	}
	@media (max-width: 800px) {
		font-size: 1rem;
		padding:0.5em 0.8em;


  }
`

export const LeftButton = Styled(TimerButton)`

	grid-area: start;
	
`
export const RightButton = Styled(TimerButton)`

	grid-area: stop;
`
