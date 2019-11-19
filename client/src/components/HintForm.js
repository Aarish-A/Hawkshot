import React, { useState } from 'react'

import {
   Button,
   ButtonGroup,
   Modal,
   Container,
   Row,
   Col,
   Form,
   FormGroup
} from 'react-bootstrap'

import hintService from '../services/hints'
import cards from '../assets/data_dragon/en_us/data/set1-en_us.json'


const HintForm = props => {
   const [hint, setHint] = useState('')
   const [show, setShow] = useState(false)
   const [selectedCard, setSelectedCard] = useState('')

   const cardCodes = cards.map(card => card.cardCode)

   const onClick = (cardId) => () => {
      setSelectedCard(cardId)
   }

   const onChange = event => {
      event.preventDefault()
      setHint(event.target.value)
   }

   const onSubmit = event => {
      event.preventDefault()
      if (!selectedCard) alert('Select a card!')
      else if (!hint) alert('type a hint!')
      else {
         hintService
            .add({
               content: hint,
               cardId: selectedCard
            })
            .then(setShow(false))
            .catch(err => console.error(err))
      }
   }

   return (
      <>
         <Button variant = 'primary' onClick = {() => setShow(true)}>
            Submit a Hint
         </Button>
         <Modal
            show = {show}
            onHide = {() => setShow(false)}
            style = {{width: '100%'}}
            scrollable
            size = 'xl'
         > 
            <Modal.Header closeButton>
               <Modal.Title>
                  Submit a new hint
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Container>
                  <Row>
                     <Col md = 'auto'>
                        <ButtonGroup vertical>
                           {cardCodes.map(code => (
                              <Button key = {code} onClick = {onClick(code)}>
                                 {cards.find(card => code === card.cardCode).name}
                              </Button>))
                           }
                        </ButtonGroup> 
                     </Col>
                     <Col>
                        <Form  onSubmit = {onSubmit}>
                           <Form.Group>
                              <Form.Label>Bless us with ur knowledge</Form.Label>
                              <Form.Control 
                                 as = 'textarea' 
                                 rows = '3' 
                                 placeholder = 'hint goes here'
                                 value = {hint}
                                 onChange = {onChange}
                              />
                           </Form.Group>
                           <Button variant = 'primary' type = 'submit'>
                              Submit
                           </Button>
                        </Form>     
                     </Col>
                  </Row>
               </Container>  
            </Modal.Body>
            <Modal.Footer>
               Please be respectful!
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default HintForm;