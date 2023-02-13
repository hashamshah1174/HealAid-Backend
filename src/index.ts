import * as http from 'http';
import { apis } from './api/app';
import { APP_HOST, APP_PORT } from './config/environment';

const hostname = APP_HOST;
const port = Number(APP_PORT);



const server = http.createServer(apis);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
