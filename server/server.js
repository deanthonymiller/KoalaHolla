const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Configure body-parser for Angular and jQuery
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This line is required for Angular

// Routes
// Should these be in a router?

// POSTz
app.post('/koala', (req, res) => {
  console.log('POST to /koala req.body =', req.body);
});

// GET
app.get('/koala', (req, res) => {
  // Temporary mock data. Replace this with mongoose.
  const mockData = [{ _id: 1, name: 'Mock 1', gender: 'F', age: 5, ready_to_transfer: true, notes: 'n/a' },
                    { _id: 2, name: 'Mock 2', gender: 'M', age: 5, ready_to_transfer: false, notes: 'n/a' }]
  res.send(mockData);
})

// Static files
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
