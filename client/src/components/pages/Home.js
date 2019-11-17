/* React Dependencies */
import React from 'react';

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

const Home = () => {
   return(
      <>
         <div>
            <Form inline>
               <FormControl type = 'text' placeholder = 'Search' className = 'mr-sm-2' style = {{width: '85%', marginLeft: '10px'}}/>
               <h5>OR</h5>
               <Button>Submit a Hint</Button>
            </Form>
         </div>
         <div>
            <Container fluid>
               <Row>
                  <h3>Sort by:</h3>
                  <ButtonToolbar>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'secondary'>Popular</Button>
                        <Button variant = 'secondary'>Recent</Button>
                        <Button variant = 'secondary'>Trending</Button>
                     </ButtonGroup>
                     <ButtonGroup className = 'mr-2' size = 'lg'>
                        <Button variant = 'All Cards'>Popular</Button>
                        <Button variant = 'All Hints'>Recent</Button>
                     </ButtonGroup>
                  </ButtonToolbar>
               </Row>
            </Container>
         </div>
      </>
    )
}

export default Home