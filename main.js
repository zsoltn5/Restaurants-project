import express from 'express';
import morgan from 'morgan';
import requestRoutes from './routes/vendeglok_get_post.js';

const app = express();
app.use(morgan('tiny'));
app.use(express.static('static/'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/', requestRoutes);

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080/ ...');
});
