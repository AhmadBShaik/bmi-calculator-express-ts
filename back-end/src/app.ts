import express, {Request, Response} from 'express'

const app = express()
app.use(express.json())

// avoid Cross Origin Request error while development
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/',(req: Request, res: Response)=>{
    return res.json({
            "UnderWeight": "Less than 18.5",
            "NormalWeight": "Between 18.5 and 25.0",
            "OverWeight": "Greater than 25.0"
    })
})

app.post('/',(req: Request, res: Response) => {
    const weight = req.body.weight as number
    const height = req.body.height as number
    
    if(!(weight && height)){
        res.statusMessage = "weight and height should not be empty"
        res.status(400).end()  
    }

    if (height && height < 110){
        res.statusMessage = "valid height should not be less than 110 cm"
        res.status(400).end()        
    }

    const bmi: number = Math.round(weight/ (height/100 * height/100)*10)/10
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

const PORT = 3000
app.listen(PORT,() => `server running in ${PORT}`)