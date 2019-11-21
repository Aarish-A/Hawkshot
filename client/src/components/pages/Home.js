/* React Dependencies */
import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase';

/* React-Bootstrap Dependencies */
import {
    Container,
    Row,
    Form,
    FormControl,
    Button,
    ButtonGroup,
    ButtonToolbar,
} from 'react-bootstrap'

/* Components */
import HintBlock from '../HintBlock'
import HintForm from '../HintForm'

/* Services */
import hintService from '../../services/hints'

const Home = withFirebase(props => {

   const [hintParams, setHintParams] = useState({
      cardId: null,
      cardName: null,
      ownerId: null,
      ownerName: null,
      limit: 5,
      hintId: null,
      sortBy: null,
      sortCat: null,
      sortType: null,
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
         ...newSort
      }

      setHintParams(newHintParams)
      hintService
         .get(newHintParams)
         .then(hints => setHints(hints))
         .then(console.log('Set new hints!', newHintParams))
   }

   return(
      <>
         <div>
            <Form inline>
               <FormControl type = 'text' placeholder = 'Search' className = 'mr-sm-2' style = {{width: '80%', marginLeft: '10px'}}/>
               <h5 style = {{width: '5%'}}>OR</h5>
               <HintForm style = {{width: '10%'}}/>
               {/* <Button style = {{width: '10%'}}>Submit a Hint</Button> */}
            </Form>
         </div>
         <div>
            <Container fluid>
               <Row>
                  <h3>Sort by:</h3>
                  <ButtonToolbar>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary' onClick = {changeSort({sortCat : 'all'})}>
                           All
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({sortCat : 'funny'})}>
                           Funny
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({sortCat : 'helpful'})}>
                           Helpful
                        </Button>
                     </ButtonGroup>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary' onClick = {changeSort({sortBy : 'popular'})}>
                           Popular
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({sortBy : 'recent'})}>
                           Recent
                        </Button>
                        <Button variant = 'secondary' onClick = {changeSort({sortBy : 'trending'})}>
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

export default Home;
