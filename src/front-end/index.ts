import fetch from "node-fetch"


const height = document.getElementById("height") as HTMLInputElement
const weight = document.getElementById("weight") as HTMLInputElement

const form = document.getElementById("main-form") as HTMLFormElement

const BMIStatus = document.getElementById("status") as HTMLElement

// const fetchBmi = async (weight: number, height: number) => {
//     const result = await fetch('http://localhost:3000',{
//             method:'POST',
//             body: JSON.stringify({
//                 height:height,
//                 weight: weight
//             }),
//             headers: {
//             'content-type': 'application/json;charset':'UTF-8'
//             }
//         }
//     )
// }

// const fetchInfo = async () =>{
//     const result = await fetch('http://localhost:3000',{
//             method:'GET'
//     })
// }

form.addEventListener('submit',(e: Event)=>{
    
    e.preventDefault()
    if (!(height.value && weight.value)){
        BMIStatus.innerHTML = "please enter height and weight"
    }else if(height.value && height.value as unknown as number <110 ){
        BMIStatus.innerHTML = "please enter valid height"
    }else{

        const weightValue= weight.value as unknown as number
        const heightValue = height.value as unknown as number
    
    }
})

