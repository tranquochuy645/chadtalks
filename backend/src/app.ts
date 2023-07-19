import express from 'express';
import path from 'path';
import api from './api';
import { filterJsonError } from './middlewares/express/jsonFilter';

const app = express();
const publicPath = path.resolve(__dirname, '../public');
const indexPath = path.join(publicPath, 'index.html');

app.use(express.static(publicPath));

app.use('/api', express.json(), filterJsonError, api);

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

export default app;
