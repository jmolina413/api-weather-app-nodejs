import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
  });

  app.post('/', async (req, res) => {
    const location = req.body.location; // You'll need to set up body-parser to parse this
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5dc31a0fbd266df5236e253c43f4c6bf`;
  
    try {
      const response = await axios.get(url);
      const weather = response.data;
  
      res.render('index', { weather: weather, error: null });
    } catch (error) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});