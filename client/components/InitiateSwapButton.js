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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'

function FormDialog(props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedService, setSelectedService] = useState(null)

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
    const obj = {
      requesterServiceId: selectedService.id,
      requesterId: props.user.id,
      responderServiceId: props.providerService.id,
      responderId: props.providerUser.id,
      swapStatus: 'pending'
    }
    try {
      const res = await axios.post('/api/swaps/', obj)
      console.log(res)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
            {props.services.map(service => (
              <ListItem
                button
                onClick={() => handleServiceButtonClick(service)}
                key={service.id}
              >
                <img src={service.photo} />
                <ListItemText primary={service.name} />
              </ListItem>
            ))}
          </List>
          <DialogContentText>
            Curate your message and work out the details!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="email"
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
  )
}

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => {
  return {
    user: state.user,
    services: state.services.userServices
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
