const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/', (req, res) => {
    const quotesArray = Quote.all;
    res.send(quotesArray)
  })

app.listen(port, () => console.log(`Now running on http://localhost:${port}`))
