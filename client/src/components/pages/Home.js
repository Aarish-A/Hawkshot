/* React Dependencies */
import React, { useState, useEffect } from 'react';

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

const Home = () => {
   const [sort, setSort] = useState({order: 'popular', type: 'hint'})
   const [hints, setHints] = useState([])

   useEffect(() => {
      hintService
         .get({limit: 50})
         .then(initialHints => setHints(initialHints.hints))
   }, [])

   const showHints = () => {
      hints.map(hint => 
         <HintBlock 
            key = {hint.id} 
            hint = {hint}
         />
      )
   }

   /*
      <HintBlock
         key = hint.id
         hint = ''
         updateVote 
      />
   */

   /*
      <CardBlock

      />
   */

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
                        <Button variant = 'secondary'>All</Button>
                        <Button variant = 'secondary'>Funny</Button>
                        <Button variant = 'secondary'>Helpful</Button>
                     </ButtonGroup>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary'>Popular</Button>
                        <Button variant = 'secondary'>Recent</Button>
                        <Button variant = 'secondary'>Trending</Button>
                     </ButtonGroup>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary'>All Cards</Button>
                        <Button variant = 'secondary'>All Hints</Button>
                     </ButtonGroup>
                  </ButtonToolbar>
               </Row>
            </Container>
         </div>
         <div>
            <Container fluid>
               <Row style = {{overflowY: 'scroll', height: '45%'}}>
                  {                     
                     hints.map(hint => 
                        <div style = {{width: '50%'}}>
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

export default Home