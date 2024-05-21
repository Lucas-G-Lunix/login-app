import express from 'express';
//import morgan from 'morgan';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';

const app = express();

const port = config.get<number>('port');

app.use(express.json());

//app.use(morgan('dev'));


app.listen(port, async () => {
    log.info(`App running on http://localhost:${port}/`);
    await connect();

    routes(app);
});
