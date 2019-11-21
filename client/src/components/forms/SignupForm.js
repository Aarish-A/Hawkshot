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

const SignupForm = ({firebase, history}) => {
   const [email, setEmail] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [formError, setFormError] = useState(null)
   const classes = useStyles()

   const onEmailChange = event => {
      event.preventDefault()
      setEmail(event.target.value)
   }

   const onUsernameChange = event => {
      event.preventDefault()
      setUsername(event.target.value)
   }

   const onPasswordChange = event => {
      event.preventDefault()
      setPassword(event.target.value)
   }

   const onConfirmPasswordChange = event => {
      event.preventDefault()
      setConfirmPassword(event.target.value)
   }

   const onFormSubmit = event => {
      event.preventDefault()

      console.log('Signing up...')
      firebase
         .createUserWithEmailAndPassword(email, password)
         .then(authUser => {
            authUser.user.updateProfile({
               displayName: username
            })
            hintService.updateToken(firebase)
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            console.log('Successfully signed up!')
            history.push('/')
         })
         .catch(error => {
            setFormError(error)
            console.error('Could not sign up', error)
         })
   };

   const invalidForm =
      password !== confirmPassword ||
      password === '' ||
      email === '' ||
      username === '';

   const errorMessage = 
      formError ? formError.message : 
      (password !== confirmPassword && confirmPassword) ? 'Passwords do not match' : ''

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
            label = "Username"
            placeholder = ""
            helperText="This will be visible to everyone else, please be respectful!"
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
            value = {username}
            onChange = {onUsernameChange}
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
            className = {classes.formItem}
            variant="outlined"
            type = 'password'
            value = {password}
            onChange = {onPasswordChange}
         />
         <TextField
            id = "outlined-full-width"
            label = "Confirm Password"
            placeholder = ""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            error = {formError || (errorMessage ? true : false)}
            helperText = {errorMessage}
            className = {classes.formItem}
            variant="outlined"
            type = 'password'
            value = {confirmPassword}
            onChange = {onConfirmPasswordChange}
         />
         <Fab 
            type = 'submit' 
            variant = 'extended'
            color = 'primary' 
            className = {classes.submitButton}
            disabled = {invalidForm}
            onClick = {onFormSubmit}
         >
            <Typography variant = 'button'>SIGNUP</Typography>
         </Fab>
      </div>
   )
}

export default withFirebase(withRouter(SignupForm))