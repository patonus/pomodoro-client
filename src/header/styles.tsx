import Styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export const HeaderContainer = Styled.header`
    background-color: ${(props) => props.theme.dark};
    margin-bottom:6px;
    position: sticky;
    top: 0;
    display:flex;
    justify-content: space-between;
    align-items: center;
    z-index:50;

`
export const LinkList = Styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
`
export const LinkItem = Styled.li<{ active: boolean }>`
   	display:inline-block;
 	padding:0.35em 1.2em;
 	margin:0 0.3em 0.3em 0.3em;
 	border-radius:0.12em;
 	box-sizing: border-box;
 	text-decoration:none;
 	font-family:'Roboto',sans-serif;
 	font-weight:900;
 	text-align:center;
 	transition: all 0.2s;
	background-color: ${(props) => props.theme.dark};
	&:hover{
		color:${(props) => props.theme.dark};
 		background-color:#FFFFFF;
	}
    color:${(props) => (props.active ? props.theme.dark : '#FFFFFF')};
    background-color: ${(props) => (props.active ? '#FFFFFF' : 'inherit')};


`
export const NavLink = Styled(Link)`
    list-style-type: none;
    text-decoration: none;

`

export const Brand = Styled.div`
    color:white; 
    background-color: ${(props) => props.theme.accent};
    font-size: 2em;
    padding: 10px 20px;
    border-radius: 0px 3px 3px 0;

`
