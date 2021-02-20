import { Helmet } from 'react-helmet-async'
interface Props {
	title: string
}
//Todo add circular favicon for progress (canvas?)
const Head = ({ title }: Props) => (
	<Helmet defer={false}>
		<title>{title}</title>
	</Helmet>
)

export default Head
