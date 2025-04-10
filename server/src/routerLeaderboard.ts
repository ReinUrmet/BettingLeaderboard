import { Router } from 'express';
import { getLeaderboard } from './db/queries/leaderboard';

export const routerLeaderboard = Router();

routerLeaderboard.get('/leaderboard', async (req, res) => {
  try {
    //Loen riigi infot kui pole filtrit antud siis tagastan kõik
    const countryFilter = req.query.country as string | undefined;
    const leaderboard = await getLeaderboard(countryFilter ?? 'all');
    res.json(leaderboard);
  } catch (error) {
    //Viskan errori kui ei saanud datat
    console.error('Error fetching leaderboard data:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
});
