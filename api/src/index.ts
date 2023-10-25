import express from 'express'
import proposalRouter from './routes/proposalRouter'
import activitiesRouter from './routes/activitiesRouter'
import loginRouter from './routes/loginRouter'
import gamesRouter from './routes/gamesRouter'
const cors = require('cors');
const app = express()
app.use(express.json()) //middleware

const PORT = 3000

//Arreglar para especificar el puerto especifico 4200 para que tenga acceso
app.use(cors()); 
app.use('/api/proposal', proposalRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/login', loginRouter)
app.use('/api/games', gamesRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
