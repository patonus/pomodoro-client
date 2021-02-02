import Styled from 'styled-components/macro'

export const FinishedContainer = Styled.div`
 	background-color:${(props) => props.theme.light2};
   padding: 0.5em ;
   margin: 0 auto 0.5em auto; 
   max-width:1000px;  
   border-radius: 3px;
	box-shadow: 0 -2px 10px black;


`

export const RecordHeader = Styled.div`
   background-color: ${(props) => props.theme.dark};
   border-radius: 3px;

   display: grid;
   grid-template-columns: 1fr auto 1fr;
`

export const DateTime = Styled.div`
   color:white; 
   padding: 8px 0;
   font-size: 2em;

`
export const Icon = Styled.div`
   padding: 8px 12px ;
   font-size: 2em;

`
export const TrashButtonContainer = Styled.div`
`
export const TrashButton = Styled.button`
   background-color:inherit;
   border: none; 
   color:white; 
   padding: 8px 12px;
   border-radius: 25%;
   font-size: 2em;
   max-width:2em;
   justify-self: end;
  cursor: pointer; 

  &:hover{
     filter: brightness(200%);
  }
`

export const DurationLabelContainer = Styled.div`
   display:flex;
   align-items: center;


`
export const ListHeader = Styled.h2`
   margin: 1rem auto;
   border-top: 1px solid white;
   border-bottom: 1px solid white;
   text-align:center;
   padding: 0.5rem;
   font-size: 2.5em;
   max-width: 1000px;

  
`
