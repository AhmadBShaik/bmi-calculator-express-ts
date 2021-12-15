const height = document.getElementById("height") as HTMLInputElement
const weight = document.getElementById("weight") as HTMLInputElement

const form = document.getElementById("main-form") as HTMLFormElement

const BMIStatus = document.getElementById("status") as HTMLElement

const underWeightInfo = document.getElementById("under-weight-info") as HTMLElement
const normalWeightInfo = document.getElementById("normal-weight-info") as HTMLElement
const overWeightInfo = document.getElementById("over-weight-info") as HTMLElement

fetch('http://localhost:3000/get-bmi-info')
    .then(res => res.json())
    .then(data => {
        underWeightInfo.innerHTML = "Under Weight : " + data.UnderWeight + "<br>" 
        normalWeightInfo.innerHTML = "Normal Weight : " + data.NormalWeight + "<br>" 
        overWeightInfo.innerHTML = "Over Weight : " + data.OverWeight + "<br>" 
})


form.addEventListener('submit',(e: Event)=>{
    
    e.preventDefault()
    if (!(height.value && weight.value)){
        BMIStatus.innerHTML = "please enter height and weight"
    }else if(height.value && height.value as unknown as number <110 ){
        BMIStatus.innerHTML = "please enter valid height"
    }else{
        const weightValue= weight.value as unknown as number
        const heightValue = height.value as unknown as number
        fetch('http://localhost:3000/post-bmi-params',{
            method:'POST',
            body: JSON.stringify({
                height:heightValue,
                weight: weightValue
            }),
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            BMIStatus.innerHTML = data.status + "<br>" + data.bmi
            BMIStatus.style.color = "green"
            if(data.bmi<18.5){
                BMIStatus.style.color = "blue"
            }else if(data.bmi>25.0){
                BMIStatus.style.color = "red"
            }
        })

    }
})