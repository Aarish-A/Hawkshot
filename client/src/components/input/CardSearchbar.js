import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

import cards from '../../assets/data_dragon/en_us/data/set1-en_us'

const useStyles = makeStyles(theme => ({
   searchbar: {
      margin: '0',
      padding: '0',
      minWidth: '100%'
   },
   textArea: {
      margin: '0',
      padding: '0',
      minWidth: '100%'
   }
}))

const CardSearchbar = ({
   inputValue,
   onInputChange,
   value,
   onChange
}) => {
   const classes = useStyles()

   const ioniaCards = cards.filter(card => card.region === 'Ionia')
   const demaciaCards = cards.filter(card => card.region === 'Demacia')
   const shadowIslesCards = cards.filter(card => card.region === 'Shadow Isles')
   const noxusCards = cards.filter(card => card.region === 'Noxus')
   const piltoverAndZaunCards = cards.filter(card => card.region === 'Piltover & Zaun')
   const freljordCards = cards.filter(card => card.region === 'Freljord')
   const allCardsByRegion = 
      ioniaCards
         .concat(demaciaCards).concat(shadowIslesCards)
         .concat(noxusCards).concat(freljordCards)
         .concat(piltoverAndZaunCards)

   const cardOptions = allCardsByRegion.map(card => {
      return {
         name: card.name, 
         region: card.region,
         cardCode: card.cardCode
      }
   })

   return (
      <Autocomplete
         className = {classes.searchbar}
         options = {cardOptions}
         getOptionLabel = {card => card.name}
         groupBy = {card => card.region}
         renderInput = {params => (
            <TextField {...params} className = {classes.textArea} label = 'Search for a Card' variant = 'outlined'/>
         )}
         noOptionsText = "We couldn't find what you were looking for"
         inputValue = {inputValue}
         onInputChange = {onInputChange}
         onChange = {onChange}
      />
   )
}

export default CardSearchbar