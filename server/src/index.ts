import express, { Express } from 'express';
import cors from 'cors';
import { router } from './router';
import { routerLeaderboard } from './routerLeaderboard';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(router);
//Lisan oma ruutri ka
app.use(routerLeaderboard);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});