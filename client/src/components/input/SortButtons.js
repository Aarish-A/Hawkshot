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

const SortButtons = ({
   sort,
   handleSortChange
}) => {
   const classes = useStyles()

   return (
      <ToggleButtonGroup className = {classes.buttonGroup} exclusive value = {sort} onChange = {handleSortChange} size = 'large'>
         <ToggleButton value = 'popular'>
            <Typography variant = 'button'>Popular</Typography>
         </ToggleButton>
         <ToggleButton value = 'recent'>
            <Typography variant = 'button'>Recent</Typography>
         </ToggleButton>
         <ToggleButton value = 'trending' disabled>
            <Typography variant = 'button'>Trending</Typography>
         </ToggleButton>
      </ToggleButtonGroup>
   )
}

export default SortButtons
