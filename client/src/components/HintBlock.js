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
                  <Row style = {{border: '1px solid black', height: '75%'}}>
                     <p>{hint.content}</p>
                  </Row>
                  <Row style = {{border: '1px solid black', height: '7.5%', textAlign: 'right'}}>
                     <p style = {{position: 'absolute', right: '5px'}}>{hint.ownerId}</p>
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
                     <Button style = {{position: 'absolute', right: '0px', height: '17%'}}>
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