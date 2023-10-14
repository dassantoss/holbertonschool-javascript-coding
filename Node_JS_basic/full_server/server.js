// full_server/server.js
import express from 'express';
import path from 'path';
import router from './routes';

const app = express();

app.locals.database = process.argv[2];

app.use('/', router);

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

export default app;
