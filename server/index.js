import e from "express";
import cors from 'cors';
import authRouter from './routes/auth.js'
import connectToDb from './db/db.js'
import noteRouter from './routes/note.js'

const app = e();
app.use(cors())
app.use(e.json());


app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter )

app.get('/', (req, res) => {
    res.send("Welcome to the Note App API");})


app.listen(3030, ()=>{
    connectToDb();
    console.log("server is running on port 3030")
})