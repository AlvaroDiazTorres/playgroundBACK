import express, {Response, Request} from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import eventoRouter from './routes/evento.routes'
import paymentRouter from './routes/payment.routes'

import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser  from 'cookie-parser'
import cors  from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cookieParser())

//cambiar la url cuando deploy
app.use(cors({
    origin: ['http://localhost:5173', 'https://playground-front-five.vercel.app/', '83.37.32.61:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan('tiny'))
const limiter = rateLimit({
    max: 1000,
    windowMs: 1000 * 15 * 60
})
app.use(limiter)

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/eventos', eventoRouter)
app.use('/api/payments', paymentRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('Bienvenido al backend (api rest)')
})

export default app
