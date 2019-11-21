/* React Dependencies */
import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase';

/* React-Bootstrap Dependencies */
import {
   //  Container,
    Row,
    Form,
    FormControl,
   //  Button,
    ButtonGroup,
    ButtonToolbar,
} from 'react-bootstrap'

import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Paper from '@material-ui/core/paper'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

/* Components */
import HintBlock from '../HintBlock'
import HintForm from '../HintForm'

/* Services */
import hintService from '../../services/hints'

import cards from '../../assets/data_dragon/en_us/data/set1-en_us'

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      // border: '0.1em black solid',
      minWidth: '100%',
      padding: '0',
      margin: '0 0 0 0'
   },
   gridItem: {
      margin: '0.5em 0.5em',
      // border: '0.1em black solid',
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

// TODO: REFACTOR INTO COMPONENTS WITH FORWARD REFERENCES 
const Home = ({firebase}) => {
   const [hints, setHints] = useState([])
   const [category, setCategory] = useState('all')
   const [sort, setSort] = useState('popular') 
   const [type, setType] = useState('hints')

   useEffect(() => {
      hintService
         .get()
         .then(initialHints => setHints(initialHints))
   }, [])
   
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
         region: card.region
      }
   })

   const handleCategoryChange = (event, newCategory) => setCategory(newCategory)
   const handleSortChange = (event, newSort) => setSort(newSort)
   const handleTypeChange = (event, newType) => setType(newType)

   const getHintCards = () => {
      return hints.map(hint => {
         return (
            <Grid item key = {hint.id} className = {classes.gridItem}>
               <Paper className = {classes.paper}>
                  <Grid container justify = 'flex-start'>
                     <Grid item className = {classes.gridItem} style = {{marginTop: '0'}}>
                           <img 
                              src = {require(`../../assets/data_dragon/en_us/img/cards/${hint.cardId}.png`)}
                              alt = 'cannot load'
                              className = {classes.cardImage}
                           />
                     </Grid>
                     <Grid item sm = {7} className = {classes.gridItem} style = {{marginLeft: '0', marginRight: '0', position: 'relative'}}>
                        <Grid container direction = 'column' justify = 'space-between' alignItems = 'flex-start'>
                           <Grid item className = {classes.gridItem} style = {{textAlign: 'left', margin: '0'}}>
                              <Typography variant = 'body1' style = {{width: '265px', overflowWrap: 'break-word'}}>
                                 {hint.content}
                              </Typography>
                           </Grid>
                           <Grid item className = {classes.gridItem} style = {{position: 'absolute', bottom: '52px', left: '-2px'}}>
                              <Typography variant = 'body2'> - {hint.ownerName}</Typography>
                           </Grid>
                           <Grid item className = {classes.gridItem} style = {{position: 'absolute', bottom: '0px', left: '-5px', marginRight: '0', borderTop: '1px black solid', width: '262px'}}>
                              <div style = {{display: 'inline', marginRight: '94px'}}>
                                 <IconButton>
                                    <InsertEmoticonIcon/>
                                 </IconButton>
                                 <Typography variant = 'button' display = 'inline'>{hint.funny}</Typography>
                                 <IconButton>
                                    <ThumbUpAltOutlinedIcon/>
                                 </IconButton>
                                 <Typography variant = 'button' display = 'inline'>{hint.helpful}</Typography>
                              </div>
                              <div style = {{display: 'inline'}}>
                                 <IconButton>
                                    <ReportOutlinedIcon color = 'secondary'/>
                                 </IconButton>
                              </div>
                           </Grid>
                        </Grid>

                     </Grid>
                  </Grid>
               </Paper>
            </Grid>
         )
      })
   }

   return (
      <Container component = 'div' className = {classes.root} spacing = {0}>
         <Grid container direction = 'column' justify = 'center'>
            <Grid item className = {classes.gridItem} style = {{height: '75px'}}>
               <Grid container spacing = {1} justify = 'center' alignItems = 'center'>
                  <Grid item sm = {9} className = {classes.gridItem}>
                     <Autocomplete
                        className = {classes.searchbar}
                        options = {cardOptions}
                        getOptionLabel = {card => card.name}
                        groupBy = {card => card.region}
                        renderInput = {params => (
                           <TextField {...params} className = {classes.searchbar} label = 'Search for a Card' variant = 'outlined'/>
                        )}
                     />
                  </Grid>
                  <Grid item className = {classes.gridItem}>
                     <Button variant = 'contained' color = 'secondary' className = {classes.submitButton}>
                        <Typography variant = 'button'>
                           Submit a Hint
                        </Typography>
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
            <Grid item className = {classes.gridItem}>
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

               <ToggleButtonGroup className = {classes.buttonGroup} exclusive value = {sort} onChange = {handleSortChange} size = 'large'>
                  <ToggleButton value = 'popular'>
                     <Typography variant = 'button'>Popular</Typography>
                  </ToggleButton>
                  <ToggleButton value = 'recent'>
                     <Typography variant = 'button'>Recent</Typography>
                  </ToggleButton>
                  <ToggleButton value = 'trending'>
                     <Typography variant = 'button'>Trending</Typography>
                  </ToggleButton>
               </ToggleButtonGroup>

               <ToggleButtonGroup className = {classes.buttonGroup} exclusive value = {type} onChange = {handleTypeChange} size = 'large'>
                  <ToggleButton value = 'hints'>
                     <Typography variant = 'button'>Hints</Typography>
                  </ToggleButton>
                  <ToggleButton value = 'cards'>
                     <Typography variant = 'button'>Cards</Typography>
                  </ToggleButton>
               </ToggleButtonGroup>
            </Grid>
         </Grid>
         <Grid container justify = 'center'>
               {getHintCards()}
         </Grid>
      </Container>   
   )
}

/*
const Home = withFirebase(props => {
   const [sort, setSort] = useState({
      category: 'all',
      order: 'popular',
      type: 'hint',
   })

   const [hintParams, setHintParams] = useState({
      cardId: '',
      ownerId: '',
      limit: 2,
      hintId: '',
      sortBy: ''
   })

   const [hints, setHints] = useState([])

   useEffect(() => {
      hintService
         .get(hintParams)
         .then(initialHints => setHints(initialHints))
   }, [])

   const changeSort = newSort => () => {
      const newHintParams = {
         ...hintParams,
         sortBy: newSort.category === 'all' ? '' : 'd_' + newSort.category
      }

      setSort({
         ...sort,
         ...newSort
      })
      setHintParams(newHintParams)

      hintService
         .get(newHintParams)
         .then(hints => setHints(hints))
         .then(console.log('Set new hints!'))
   }

   const uploadHint = event => {
      event.preventDefault()

      const newHint = {

      }

      hintService.add(newHint)
   }

   return(
      <>
         <div>
            <Form inline>
               <FormControl type = 'text' placeholder = 'Search' className = 'mr-sm-2' style = {{width: '80%', marginLeft: '10px'}}/>
               <h5 style = {{width: '5%'}}>OR</h5>
               <HintForm style = {{width: '10%'}}/>
               {/* <Button style = {{width: '10%'}}>Submit a Hint</Button> *//*
            </Form>
         </div>
         <div>
            <Container fluid>
               <Row>
                  <h3>Sort by:</h3>
                  <ButtonToolbar>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary' onClick = {changeSort({category : 'all'})}>
                           All
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({category : 'funny'})}>
                           Funny
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({category : 'helpful'})}>
                           Helpful
                        </Button>
                     </ButtonGroup>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary' onClick = {changeSort({order : 'popular'})}>
                           Popular
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({order : 'recent'})}>
                           Recent
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({order : 'trending'})}>
                           Trending
                        </Button>
                     </ButtonGroup>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary' onClick = {changeSort({type : 'hints'})}>
                           All Hints
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({type: 'cards'})}>
                           All Cards
                        </Button>
                     </ButtonGroup>
                  </ButtonToolbar>
               </Row>
            </Container>
         </div>
         <div>
            <Container fluid>
               <Row>
                  {
                     hints.map(hint =>
                        <div key = {hint.id} style = {{width: '50%'}}>
                           <HintBlock
                              key = {hint.id}
                              hint = {hint}
                           />
                        </div>
                     )
                  }
               </Row>
            </Container>
         </div>
      </>
    )
})
*/

export default withFirebase(Home)
