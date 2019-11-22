import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Typography from '@material-ui/core/Typography'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles(theme => ({
   buttonGroup: {
      margin: '0 1.5em',
      marginBottom: '1em'
   }
}))

const TypeButtons = ({
   type,
   handleTypeChange
}) => {
   const classes = useStyles()

   return (
      <ToggleButtonGroup className = {classes.buttonGroup} exclusive value = {type} onChange = {handleTypeChange} size = 'large'>
         <ToggleButton value = 'hint'>
            <Typography variant = 'button'>Hint</Typography>
         </ToggleButton>
         <ToggleButton value = 'card' disabled>
            <Typography variant = 'button'>Card</Typography>
         </ToggleButton>
      </ToggleButtonGroup>
   )
}

export default TypeButtons
