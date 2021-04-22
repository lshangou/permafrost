import mongoose from 'mongoose';

export const connectDatabase = function(url: string) {
  mongoose.connect(url + '/permafrost?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))

  db.once('open', function() {
    console.log('Conected to database sucefully.')
  })
}