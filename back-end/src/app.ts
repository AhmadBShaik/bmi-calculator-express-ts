import express, {Request, Response} from 'express'
import config from 'dotenv'
import cors from 'cors'
import { calculateBMI } from './business-logic'

const app = express()

app.use(express.json())
config.config()

// avoid Cross Origin Request error while development
app.use(cors())

app.get('/get-bmi-info',(req: Request, res: Response)=>{
    return res.json({
            "UnderWeight": "Less than 18.5",
            "NormalWeight": "Between 18.5 and 25.0",
            "OverWeight": "Greater than 25.0"
    })
})

app.post('/post-bmi-params',(req: Request, res: Response) => {
    const weight = req.body.weight as number
    const height = req.body.height as number
    if(weight || height){
        if(!weight){
            res.statusMessage = "weight is required"
            res.status(400).end()  
        }
        
        if(!height){
            res.statusMessage = "height is required"
            res.status(400).end()  
        }

        if(weight > height){
            res.statusMessage = "weight can't be greater than height"
            res.status(400).end()
        }
    }else{
        res.statusMessage = "weight and height are required"
        res.status(400).end()  
    }

    
    if(height < 110){
        res.statusMessage = "valid height should not be less than 110 cm"
        res.status(400).end()        
    }else if(height > 251){
        res.statusMessage = "valid height should not be greater than 251 cm"
        res.status(400).end()  
    }

    if(weight >= 700){
        res.statusMessage = "valid weight should not be greater than 700 kg"
        res.status(400).end()
    }

    if(weight < 20){
        res.statusMessage = "valid weight should not be less than 20 kg"
        res.status(400).end()
    }

    const bmi: number = calculateBMI(weight,height)
    let message = {status:""}
    if (bmi < 18.5){
        message.status = "Underweight"
    }else if(bmi > 25.0){
        message.status = "Overweight"
    }else{
        message.status = "Normalweight"
    }
    return res.json({
        ...message,bmi
    })
})

const PORT = process.env.PORT
app.listen(PORT,() => `server running in ${PORT}`)