/* React Dependencies */
import React, { useState, useEffect } from 'react';
import {withFirebase} from '../firebase';

/* React-Bootstrap Dependencies */
import {
    Container,
    Col,
    Row,
    Form,
    FormControl,
    Button,
    ButtonGroup,
    ButtonToolbar,
} from 'react-bootstrap'

/* Components */
import HintBlock from '../HintBlock'

/* Services */
import hintService from '../../services/hints'

const HomeBase = props => {
   const [sort, setSort] = useState({
      category: 'all',
      order: 'popular',
      type: 'hint',
   })

   const [hintParams, setHintParams] = useState({
      cardId: '',
      ownerId: '',
      limit: 10,
      hintId: '',
      sortBy: ''
   })

   const [hints, setHints] = useState([])

   console.log(props.firebase.auth.currentUser);

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
               <Button style = {{width: '10%'}}>Submit a Hint</Button>
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
}

const Home = withFirebase(HomeBase);
export default Home;
