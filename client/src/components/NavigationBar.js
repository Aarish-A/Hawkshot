import React from 'react'
import {withRouter, BrowserRouter as Router, Link as RouterLink} from 'react-router-dom'
import {withFirebase} from './firebase'

import makeStyles from '@material-ui/core/styles/makeStyles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const HomeLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)
const LoginLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)
const SignupLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      background: '#ebc600',
      padding: '1em',
      margin: '0',
   },
   title: {
      textAlign: 'left',
      marginLeft: '1.5em'
   },
   captionText: {
      marginRight: '0.25em',
      marginLeft: '0.55em',
   },
   buttons: {
      position: 'absolute',
      right: '2em',
      top: '1.8em',
   }
}))

const NavigationBar = ({firebase, userAuth}) => {
   const classes = useStyles()

   const loginButtons = () => {
      if (!userAuth) {
         return (
            <>
               <Button 
                  variant = 'contained' size = 'medium' color = 'primary' 
                  component = {LoginLink} to = '/login'>
                  <Typography variant = 'button'>Sign In</Typography>
               </Button>
               <Typography variant = 'caption' className = {classes.captionText}> or </Typography>
               <Button 
                  variant = 'text'
                  component = {SignupLink} to = '/signup'>
                  <Typography variant = 'button'>Sign Up</Typography>
               </Button>
            </>
         )
      } else {
         return (
            <div>
               <Button variant = 'outlined' size = 'medium' color = 'primary'>
                  <Typography variant = 'button'>
                     Hi, <strong>{firebase.auth.currentUser.displayName}</strong>!
                  </Typography>
               </Button>
               <Button variant = 'text' style = {{color: 'black'}}>
                  <Typography variant = 'button' onClick={firebase.signOut}>Sign Out</Typography>
               </Button>
            </div>
         )
      }
   }

   return (
      <Container className = {classes.root} maxWidth = {false}>
         <Grid container style = {{position: 'relative'}}>
            <Grid item sm = {8} className = {classes.title}>
                  <Typography variant = 'h1' component = {HomeLink} to = '/'>
                     Hawkshot
                  </Typography>
            </Grid>
            <Grid item className = {classes.buttons}>
               {loginButtons()}
            </Grid>
         </Grid>
      </Container>
   )
}

export default withFirebase(withRouter(NavigationBar))