import { Slider, TextField } from '@material-ui/core'
import Styled from 'styled-components/macro'

export const FormContainer = Styled.form`
    max-width:500px;
    margin:0 auto;
`

export const VolumeSliderContainer = Styled.div`
    display:flex;
    align-items:baseline;
    justify-content: space-between;

`
export const InputLabel = Styled.label`
display:block;
    margin: 1em 0 0.5em 0;
`

export const Icon = Styled.div`
    font-size: 2em;
`

export const NumberInput = Styled(TextField)`
    margin-bottom: 1em;

`
export const StyledSlider = Styled(Slider)`
 margin:0 1em;
`

export const ListHeader = Styled.h2`
   margin: 1rem auto;
   border-top: 1px solid white;
   border-bottom: 1px solid white;
   text-align:center;
   padding: 0.5rem;
   font-size: 2.5em;

  
`
