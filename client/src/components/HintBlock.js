import React from 'react'
import PropTypes from 'prop-types'

import {Image, Container, Row, Col, Button} from 'react-bootstrap'

const HintBlock = ({hint}) => {
   return(
      <>
         <Container style = {{backgroundColor: 'grey'}}>
            <Row style = {{border: '1px solid black'}}>
               <Col style = {{border: '1px solid black'}}  sm = 'auto'>
                  {
                     hint.cardId ? <Image
                        src = {require(`../assets/data_dragon/en_us/img/cards/${hint.cardId}.png`)} 
                        alt = "Cannot load"
                        height = '300px'
                        style = {{border: '1px solid black'}}
                     /> : <p> cannot load</p>
                  }
               </Col>
               <Col style = {{border: '1px solid black'}}>
                  <Row style = {{border: '1px solid black', height: '82.5%'}}>
                     <p>{hint.content}</p>
                  </Row>
                  <Row style = {{border: '1px solid black', height: '17.5%'}}> 
                     <Button>
                        Upvote Funny
                     </Button>
                     <h5>{hint.funny}</h5>
                     <Button>
                        Upvote Helpful
                     </Button>
                     <h5>{hint.helpful}</h5>
                     <Button>
                        Report
                     </Button>
                  </Row>
               </Col>
            </Row>
         </Container> 
      </>
   )
}

HintBlock.propTypes = {
   hint: PropTypes.object.isRequired,
   handleUpvote: PropTypes.func
}

export default HintBlock;