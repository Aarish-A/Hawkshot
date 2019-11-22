import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const Footer = () => {
   return (
      <Container styles = {{textAlign: 'center', margin: '1em'}}>
         <Typography variant = 'body2' textAlign = 'center'>
            Hawkshot isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
         </Typography>
      </Container>
   )
}

export default Footer