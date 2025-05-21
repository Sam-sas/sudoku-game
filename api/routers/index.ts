import express, { Request, Response } from "express";
import cors from "cors";
import { getSudoku } from 'sudoku-gen';


const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

type Level = 'easy' | 'medium' | 'hard' | 'expert';

//currently sends a random sudoku puzzle json response
app.get('/', (req: Request, res: Response) => {
  const sudoku = getSudoku();
  res.json(sudoku);
});

app.get('/difficulty/:level', (req: Request<{ level: string }>, res: Response) => {
  const level = req.params.level as Level;
  if (level) {
    const sudoku = getSudoku(level);
    res.json(sudoku);
  } else {
    res.status(400).json({ error: 'Selecting a level is required' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
