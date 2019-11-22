import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';

import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'

import hintService from '../../services/hints'

const useStyles = makeStyles(theme => ({
   root: {
   },
   formItem: {
      margin: '1.2em auto',
      marginTop: '2.5em',
      maxWidth: '90%'
   },
   submitButton: {
      margin: '1.2em auto',
      width: '20%'
   }
}))

const ReportForm = ({handleCloseSubmission, hint}) => {
   const [content, setContent] = useState('')
   const [formError, setFormError] = useState(null)
   const [showForm, setShowForm] = useState(true)
   const classes = useStyles()

   const onContentChange = event => {
      event.preventDefault()
      setContent(event.target.value)
   }

   const onFormSubmit = event => {
      event.preventDefault()
      hintService
         .report(content, hint.id)
         .then(response => {
            setContent('')
            setFormError(null)
            setShowForm(false)
            setTimeout(() => handleCloseSubmission(), 1500)
         })
         .catch(error => {
            console.error(error)
            setFormError(error)
         })
   };

   const invalidForm = !content
   const errorMessage = formError ? formError.message : ''

   return (
      showForm ?

      <Grid container direction = 'column'>
         <TextField
            id = "outlined-full-width"
            label = "Tell us the reason for this report"
            placeholder = ""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            multiline
            rows = {5}
            variant = 'fill'
            error = {formError}
            helperText = {!errorMessage ? 'Safety is important to us! We will try our best to filter hints reported with enough valid reasons' : errorMessage}
            className = {classes.formItem}
            variant="outlined"
            type = 'text'
            value = {content}
            onChange = {onContentChange}
         />
         <Fab
            type = 'submit'
            variant = 'extended'
            color = 'primary'
            className = {classes.submitButton}
            disabled = {invalidForm}
            onClick = {onFormSubmit}
         >
            <Typography variant = 'button'>Submit Report</Typography>
         </Fab>
      </Grid>

      :

      <Typography variant = 'h5' align = 'center'>
         Successfully submitted report!
      </Typography>
   )
}

export default ReportForm
