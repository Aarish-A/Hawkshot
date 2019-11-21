import React, { useState, useEffect } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SignupForm from '../forms/SignupForm'

const useStyles = makeStyles(theme => ({
   root: {
      margin: 'auto',
      marginTop: '2em',
      width: '50%',
      minWidth: '500px'
   },
   grid: {
      width: '100%',
      margin: 'auto',
      border: 'black 0.1em solid',
      textAlign: 'center'
   }
}))

const SignupPage = () => {
   const classes = useStyles()
   return (
      <Paper elevation = {3} className = {classes.root}>
      <Grid container direction = 'column' justify = 'center' alignContent = 'center' alignItems = 'center' spacing = {3} className = {classes.grid}>
         <Grid item>
            <Typography variant = 'h3'>Sign Up</Typography>
         </Grid>
         <Grid item >
            <SignupForm />
         </Grid>
      </Grid>
      </Paper>
   )
}

export default SignupPage;