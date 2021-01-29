import { Helmet } from 'react-helmet-async'
interface Props {
	time: string
	isWork: boolean
}
//Todo add circular favicon for progress (canvas?)
const Head = ({ time, isWork }: Props) => {
	const durationLabel = isWork ? 'work' : 'break'
	const title = time + ' ' + durationLabel
	return (
		<Helmet defer={false}>
			<title>{title}</title>
		</Helmet>
	)
}

export default Head
