import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase';

import makeStyles from '@material-ui/core/styles/makeStyles'
import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField' // STYLES IMPORTED... LEAVE HERE
import Autocomplete from '@material-ui/lab/Autocomplete' // STYLES IMPORTED... LEAVE HERE
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

import CardSearchbar from '../input/CardSearchbar'
import CategoryButtons from '../input/CategoryButtons'
import SortButtons from '../input/SortButtons'
import TypeButtons from '../input/TypeButtons'
import HintSubmissionForm from '../forms/HintSubmissionForm';
import HintCard from '../HintCard'

import hintService from '../../services/hints'

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      minWidth: '100%',
      padding: '0',
      margin: '0 0 0 0'
   },
   gridItem: {
      margin: '0.5em 0.5em',
      textAlign: 'center',
      overflowWrap: 'hyphens'
   },
   searchbar: {
      margin: '0',
      padding: '0',
      minWidth: '100%',
   },
   submitButton: {
      height: '50px'
   },
   submissionModal: {
      height: '85%',
      width: '85%',
      margin: 'auto',
   },
   submissionModalPaper: {
      padding: '3em'
   },
   buttonGroup: {
      margin: '0 1.5em',
      marginBottom: '1em'
   },
   paper: {
      height: '250px',
      width: '460px'
   },
   cardImage: {
      height: '250px'
   }
}))

const Home = ({firebase}) => {
   const [hints, setHints] = useState([])
   const [category, setCategory] = useState('all')
   const [sort, setSort] = useState('popular') 
   const [type, setType] = useState('hints')
   const [search, setSearch] = useState('')
   const [searchItem, setSearchItem] = useState('')
   const [openSubmission, setOpenSubmission] = useState(false)

   useEffect(() => {
      hintService
         .get()
         .then(initialHints => setHints(initialHints))
   }, [])
   
   const classes = useStyles()

   const changedFilter = (filterParam, filterParamArg) => {
      let filterParams = {
         cardName: searchItem ? searchItem.name : '',
         sortCat: category,
         sortBy: sort,
         type: type,

      }
      filterParams[filterParam] = filterParamArg

      hintService
         .get(filterParams)
         .then(hints => setHints(hints))
   }

   const handleCategoryChange = (event, newCategory) => {setCategory(newCategory); changedFilter('sortCat', newCategory)}
   const handleSortChange = (event, newSort) => {setSort(newSort); changedFilter('sortBy', newSort)}
   const handleTypeChange = (event, newType) => {setType(newType); changedFilter('type', newType)}
   const handleSearchbarChange = (event, newSearch) => {setSearch(newSearch); changedFilter(); console.log('bruh')}
   const handleSearchItemChange = (event, newSearchItem) => {setSearchItem(newSearchItem); changedFilter('cardName', newSearchItem ? newSearchItem.name : '')}
   const handleOpenSubmission = () => setOpenSubmission(true)
   const handleCloseSubmission = () => setOpenSubmission(false)

   const getHintCards = () => {
      return hints.map(hint => {
         return (
            <Grid item key = {hint.id} className = {classes.gridItem}>
               <HintCard hint = {hint}/>
            </Grid>
         )
      })
   }

   return (
      <Container component = 'div' className = {classes.root} spacing = {0}>
         <Modal
            open = {openSubmission}
            onClose = {handleCloseSubmission}
            onEscapeKeyDown = {handleCloseSubmission}
            onBackdropClick = {handleCloseSubmission}
            className = {classes.submissionModal}
         >
            <Paper className = {classes.submissionModalPaper}>
               <HintSubmissionForm handleCloseSubmission = {handleCloseSubmission}/>
            </Paper>
         </Modal>

         <Grid container direction = 'column' justify = 'center'>
            <Grid item className = {classes.gridItem} style = {{height: '75px'}}>
               <Grid container spacing = {1} justify = 'center' alignItems = 'center'>
                  <Grid item sm = {10} className = {classes.gridItem}>
                     <CardSearchbar
                        className = {classes.searchbar}
                        inputValue = {search}
                        onInputChange = {handleSearchbarChange}
                        input = {searchItem}
                        onChange = {handleSearchItemChange}
                     />
                  </Grid>
                  <Grid item className = {classes.gridItem}>
                     <Button onClick = {handleOpenSubmission} variant = 'contained' color = 'secondary' className = {classes.submitButton}>
                        <Typography variant = 'button'>
                           Submit a Hint
                        </Typography>
                     </Button>
                     
                  </Grid>
               </Grid>
            </Grid>
            <Grid item className = {classes.gridItem}>
               <CategoryButtons category = {category} handleCategoryChange = {handleCategoryChange}/>
               <SortButtons sort = {sort} handleSortChange = {handleSortChange}/>
               <TypeButtons type = {type} handleTypeChange = {handleTypeChange}/>
            </Grid>
         </Grid>
         <Grid container justify = 'center'>
            {getHintCards()}
         </Grid>
      </Container>   
   )
}

export default withFirebase(Home)
