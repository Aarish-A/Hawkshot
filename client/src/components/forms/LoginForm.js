import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';

import makeStyles from '@material-ui/core/styles/makeStyles'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'

import hintService from '../../services/hints'

const useStyles = makeStyles(theme => ({
   root: {
   },
   formItem: {
      margin: '1.2em auto',
      maxWidth: '90%'
   },
   submitButton: {
      margin: '1.2em auto',
      width: '20%'
   },
}))

const LoginForm = ({firebase, history}) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [formError, setFormError] = useState(null)
   const classes = useStyles()

   const onEmailChange = event => {
      event.preventDefault()
      setEmail(event.target.value)
   }

   const onPasswordChange = event => {
      event.preventDefault()
      setPassword(event.target.value)
   }

   const onFormSubmit = event => {
      event.preventDefault()
      console.log('Logging in...')
      firebase
         .signInWithEmailAndPassword(email, password)
         .then(() => {
            hintService.updateToken(firebase)
            setEmail('')
            setPassword('')
            setFormError(null)
            history.push('/')
            console.log('Successfully logged in!')
         })
         .catch(error => {
            setFormError(error)
            console.error('Could not authenticate', error)
         })
   }

   const errorMessage = formError ? formError.message : ''

   return (
      <div>
         <TextField
            id = "outlined-full-width"
            label = "Email"
            placeholder = ""
            helperText=""
            fullWidth
            autoFocus
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            error = {formError}
            className = {classes.formItem}
            variant="outlined"
            type = 'email'
            value = {email}
            onChange = {onEmailChange}
         />
         <TextField
            id = "outlined-full-width"
            label = "Password"
            placeholder = ""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            error = {formError}
            helperText = {errorMessage}
            className = {classes.formItem}
            variant="outlined"
            type = 'password'
            value = {password}
            onChange = {onPasswordChange}
         />
         <Fab 
            type = 'submit' 
            variant = 'extended' 
            color = 'primary' 
            className = {classes.submitButton}
            onClick = {onFormSubmit}
         >
            <Typography variant = 'button'>LOGIN</Typography>
         </Fab>
      </div>
   )
}

export default withFirebase(withRouter(LoginForm))