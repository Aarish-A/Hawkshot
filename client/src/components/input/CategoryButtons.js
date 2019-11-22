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

const CategoryButtons = ({
   category,
   handleCategoryChange
}) => {
   const classes = useStyles()

   return (
      <ToggleButtonGroup className = {classes.buttonGroup} exclusive value = {category} onChange = {handleCategoryChange} size = 'large'>
         <ToggleButton value = 'all'>
            <Typography variant = 'button'>All</Typography>
         </ToggleButton>
         <ToggleButton value = 'funny'>
            <Typography variant = 'button'>Funny</Typography>
         </ToggleButton>
         <ToggleButton value = 'helpful'>
            <Typography variant = 'button'>Helpful</Typography>
         </ToggleButton>
      </ToggleButtonGroup>
   )
}

export default CategoryButtons
