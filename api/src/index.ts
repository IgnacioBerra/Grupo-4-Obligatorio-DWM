import express from 'express'
import propuestaRouter from './routes/propuesta'
const cors = require('cors');
const app = express()
app.use(express.json()) //middleware

const PORT = 3000

//Arreglar para especificar el puerto especifico 4200 para que tenga acceso
app.use(cors()); 
app.use('/api/propuestas', propuestaRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
