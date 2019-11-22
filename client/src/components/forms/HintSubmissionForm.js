import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';

import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'

import CardSearchbar from '../input/CardSearchbar'

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
   },
   searchbar: {
      margin: 'auto'
   },
   cardImage: {
      height: '20%'
   }
}))

const HintSubmissionForm = ({handleCloseSubmission}) => {
   const [search, setSearch] = useState('')
   const [selectedCard, setSelectedCard] = useState(null)
   const [content, setContent] = useState('')
   const [formError, setFormError] = useState(null)
   const [showForm, setShowForm] = useState(true)
   const classes = useStyles()

   const handleSearchbarChange = (event, newSearch) => setSearch(newSearch)
   const handleSelectedCardChange = (event, newSelectedCard) => setSelectedCard(newSelectedCard)

   const onContentChange = event => {
      event.preventDefault()
      setContent(event.target.value)
   }

   const onFormSubmit = event => {
      event.preventDefault()
      hintService
         .add({
            content: content,
            cardId: selectedCard.cardCode
         })
         .then(response => {
            setSearch('')
            setSelectedCard(null)
            setContent('')
            setFormError(null)
            setShowForm(false)
            setTimeout(() => handleCloseSubmission(), 750)
         })
         .catch(error => {
            console.error(error)
            setFormError(error)
         })
   };

   const invalidForm = !selectedCard || !content  
   const errorMessage = formError ? formError.message : ''

   return (
      showForm ? 

      <Grid container direction = 'column'>
         <CardSearchbar
            className = {classes.searchbar}
            inputValue = {search}
            onInputChange = {handleSearchbarChange}
            value = {selectedCard}
            onChange = {handleSelectedCardChange}
         />
         <TextField
            id = "outlined-full-width"
            label = "Tell us your hint!"
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
            helperText = {!errorMessage ? 'Please be respectful! Keep in mind we automatically censor obscene language.' : errorMessage}
            className = {classes.formItem}
            variant="outlined"
            type = 'password'
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
            <Typography variant = 'button'>Submit Hint</Typography>
         </Fab>
      </Grid>

      :

      <Typography variant = 'h5' align = 'center'>
         Successfully submitted hint!
      </Typography>
   )
}

export default HintSubmissionForm