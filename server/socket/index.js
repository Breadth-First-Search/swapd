module.exports = io => {
  // const test = io.of('/test')

  // test.on('connect', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id} BUKU BUX`)
  // })
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-interest', interest => {
      socket.broadcast.emit('new-interest', interest)
    })

    // socket.on('new-message', message => {
    //   socket.broadcast.emit('new-message', message)
    // })

    socket.on('new-message', message => {
      console.log(socket.rooms)
      console.log(message.text)
      socket.to(`swap-${message.swapId}`).emit('new-message', message)
    })

    socket.on('join-room', room => {
      console.log(`${socket.id} joined the room swap-${room}`)
      socket.join(`swap-${room}`)
    })

    socket.on('leave-room', room => {
      console.log(`${socket.id} left the room swap-${room}`)
      socket.leave(`swap-${room}`)
    })

    socket.on('new-offer', offer => {
      socket.boardcast.emit('new-offer', offer)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
