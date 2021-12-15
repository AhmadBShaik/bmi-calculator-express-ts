"use strict";
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const form = document.getElementById("main-form");
const BMIStatus = document.getElementById("status");
const underWeightInfo = document.getElementById("under-weight-info");
const normalWeightInfo = document.getElementById("normal-weight-info");
const overWeightInfo = document.getElementById("over-weight-info");
// http://localhost:3000/get-bmi-info
// http://localhost:3000/get-bmi-info
fetch('http://localhost:3000/get-bmi-info')
    .then(res => res.json())
    .then(data => {
    underWeightInfo.innerHTML = "Under Weight : " + data.UnderWeight + "<br>";
    normalWeightInfo.innerHTML = "Normal Weight : " + data.NormalWeight + "<br>";
    overWeightInfo.innerHTML = "Over Weight : " + data.OverWeight + "<br>";
});
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
        fetch('http://localhost:3000/post-bmi-params', {
            method: 'POST',
            body: JSON.stringify({
                height: heightValue,
                weight: weightValue
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
            BMIStatus.innerHTML = data.status + "<br>" + data.bmi;
            BMIStatus.style.color = "green";
            if (data.bmi < 18.5) {
                BMIStatus.style.color = "blue";
            }
            else if (data.bmi > 25.0) {
                BMIStatus.style.color = "red";
            }
        });
    }
});
