import React, {useEffect, useState} from 'react'

import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/paper'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

import hintService from '../services/hints'

const useStyles = makeStyles(theme => ({
   gridItem: {
      margin: '0.5em 0.5em',
      textAlign: 'center',
      overflowWrap: 'hyphens'
   },
   paper: {
      height: '250px',
      width: '460px'
   },
   cardImage: {
      height: '250px'
   }
}))

const HintCard = ({hint}) => {
   const [votedOn, setVotedOn] = useState({funny: [], helpful: [], report: []})

   useEffect(() => {
      hintService
         .getVotes()
         .then(votes => setVotedOn(votes))
   }, [])

   const handleFunnyClick = event => {
      event.preventDefault()
      if (votedOn.funny.find(id => id === hint.id)) {
         hintService
            .update(hint.id, 'notfunny')
            .then(() => {
               hint.funny -= 1
               let arr = votedOn.funny
               votedOn.funny.splice(votedOn.funny.indexOf(hint.id))
               setVotedOn({...votedOn, funny: arr})
            })
      } else {
         hintService
            .update(hint.id, 'funny')
            .then(() => {
               hint.funny += 1
               const arr = votedOn.funny.concat(hint.id)
               setVotedOn({...votedOn, funny: arr})
            })
      }
   }

   const handleHelpfulClick = event => {
      event.preventDefault()
      if (votedOn.helpful.find(id => id === hint.id)) {
         hintService
            .update(hint.id, 'nothelpful')
            .then(() => {
               hint.helpful -= 1
               let arr = votedOn.funny
               votedOn.helpful.splice(votedOn.helpful.indexOf(hint.id))
               setVotedOn({...votedOn, helpful: arr})
            })
      } else {
         hintService
            .update(hint.id, 'helpful')
            .then(() => {
               hint.helpful += 1
               const arr = votedOn.helpful.concat(hint.id)
               setVotedOn({...votedOn, helpful: arr})
            })
      }
   }

   const handleReportClick = event => {
      event.preventDefault()
      if (!votedOn.report.find(id => id === hint.id)) {
         hintService
            .report(hint.id)
            .then(() => {
               const arr = votedOn.report.concat(hint.id)
               setVotedOn({...votedOn, report: arr})
            })
      } 
   }


   const classes = useStyles()

   return (
      <Paper className = {classes.paper}>
         <Grid container justify = 'flex-start'>
            <Grid item className = {classes.gridItem} style = {{marginTop: '0'}}>
                  <img 
                     src = {`https://lor.mln.cx/Set1/en_us/img/cards/${hint.cardId}.png`}
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
                        <IconButton onClick = {handleFunnyClick}>
                           <InsertEmoticonIcon color = {votedOn.funny.find(id => id === hint.id) ? 'primary' : 'default'}/>
                        </IconButton>
                        <Typography variant = 'button' display = 'inline'>{hint.funny}</Typography>
                        <IconButton onClick = {handleHelpfulClick}>
                           <ThumbUpAltOutlinedIcon color = {votedOn.helpful.find(id => id === hint.id ? 'primary' : 'default')}/>
                        </IconButton>
                        <Typography variant = 'button' display = 'inline'>{hint.helpful}</Typography>
                     </div>
                     <div style = {{display: 'inline', marginLeft: '5px'}}>
                        <IconButton onClick = {handleReportClick}>
                           <ReportOutlinedIcon color = {votedOn.report.find(id => id === hint.id) ? 'error' : 'default'}/>
                        </IconButton>
                     </div>
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
      </Paper>
   )
}

export default HintCard