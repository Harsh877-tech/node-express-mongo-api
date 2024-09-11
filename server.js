const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://harsha123:ILnwL0E7TEZ98ASK@mycluster1.7zwn4.mongodb.net/MyCricketTeam?retryWrites=true&w=majority&appName=MyCluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  battingStyle: String,
  bowlingStyle: String,
  country: String,
  age: Number,
  stats: {
    matches: Number,
    runs: Number,
    average: Number,
    centuries: Number,
    halfCenturies: Number,
    wickets: Number,
    economy: Number,
    bestBowling: String,
    battingAverage: Number,
    bowlingAverage: Number
  }
});

const Player = mongoose.model('Player', playerSchema);

app.get('/api/players', async (req, res) => {
  const players = await Player.find();
  res.send(players);
});

app.post('/api/players', async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.send(player);
});

app.patch('/api/players/:id', async (req, res) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(player);
});

app.delete('/api/players/:id', async (req, res) => {
  const player = await Player.findByIdAndRemove(req.params.id);
  res.send(player);
});

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));