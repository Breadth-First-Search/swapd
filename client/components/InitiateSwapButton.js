import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {connect} from 'react-redux'
import axios from 'axios'
import {postNewMessage} from '../store/messages'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import history from '../history'

function FormDialog(props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedService, setSelectedService] = useState(null)

  // useEffect( ()=> {
  //   if(props.services.userServices)
  // })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleServiceButtonClick = service => {
    setSelectedService(service)
  }

  const handleSubmit = async () => {
    if (message && selectedService) {
      const swapObj = {
        requesterServiceId: selectedService.id,
        requesterId: props.user.id,
        responderServiceId: props.providerService.id,
        responderId: props.providerUser.id,
        swapStatus: 'pending'
      }
      try {
        const swapRes = await axios.post('/api/swaps/', swapObj)
        if (!swapRes.data[1]) {
          alert('Looks like you already have a open swap going.')
          history.push(`/swaps/${swapRes.data[0].id}`)
        } else {
          const messageObj = {
            swapId: swapRes.data[0].id,
            userId: props.user.id,
            requesterId: props.user.id,
            responderId: props.providerUser.id,
            text: message,
            type: 'CURRENT_OFFER'
          }
          // const res = await axios.post('/api/messages/initiate', messageObj)
          props.post(messageObj)
          setOpen(false)
          history.push(`/swaps/${swapRes.data[0].id}`)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Please include a friendly message and select a service to swap.')
    }
  }

  return props.services.length ? (
    <div>
      <Button
        style={{color: 'white', backgroundColor: '#25665C'}}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Request Swap
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Service to Swap</DialogTitle>
        <DialogContent>
          <List>
            {props.services.length
              ? props.services.map(service => (
                  <ListItem
                    button
                    selected={selectedService === service}
                    onClick={() => handleServiceButtonClick(service)}
                    key={service.id}
                  >
                    <img src={service.photo} />
                    <ListItemText primary={service.name} />
                  </ListItem>
                ))
              : null}
          </List>
          <DialogContentText>
            Curate your message and work out the details!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="text"
            value={message}
            onChange={() => setMessage(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null
}

const mapDispatchToProps = dispatch => {
  return {
    post: message => dispatch(postNewMessage(message))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    services: state.services.userServices
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
