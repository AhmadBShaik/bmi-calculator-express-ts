"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const form = document.getElementById("main-form");
const BMIStatus = document.getElementById("status");
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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!(height.value && weight.value)) {
        BMIStatus.innerHTML = "please enter height and weight";
    }
    else if (height.value && height.value < 110) {
        BMIStatus.innerHTML = "please enter valid height";
    }
    else {
        const weightValue = weight.value;
        const heightValue = height.value;
    }
});
