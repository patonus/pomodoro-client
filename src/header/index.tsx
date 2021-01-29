import { useLocation } from 'react-router-dom'
import { HeaderContainer, LinkList, NavLink, Brand, LinkItem } from './styles'

interface NavItemProps {
	path: string
	label: string
}
const NavItem = ({ path, label }: NavItemProps) => {
	const { pathname } = useLocation()
	return (
		<NavLink to={path}>
			<LinkItem active={pathname === path}>{label}</LinkItem>
		</NavLink>
	)
}
const routes = [
	{ path: '/settings', label: 'Settings' },
	{ path: '/history', label: 'History' },
]

const Header = () => (
	<HeaderContainer>
		<NavLink to='/'>
			<Brand>Pomidorek</Brand>
		</NavLink>
		<LinkList>
			{routes.map(({ path, label }) => (
				<NavItem key={path} path={path} label={label} />
			))}
		</LinkList>
	</HeaderContainer>
)
export default Header
