"use strict";
(() => {
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const form = document.getElementById("main-form");
    const BMIStatus = document.getElementById("status");
    BMIStatus.style.color = "maroon";
    const underWeightInfo = document.getElementById("under-weight-info");
    const normalWeightInfo = document.getElementById("normal-weight-info");
    const overWeightInfo = document.getElementById("over-weight-info");
    fetch('http://localhost:3000/get-bmi-info')
        .then(res => res.json())
        .then(data => {
        underWeightInfo.innerHTML = "Under Weight : " + data.UnderWeight + "<br>";
        normalWeightInfo.innerHTML = "Normal Weight : " + data.NormalWeight + "<br>";
        overWeightInfo.innerHTML = "Over Weight : " + data.OverWeight + "<br>";
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (height.value || weight.value) {
            if (!height.value) {
                BMIStatus.innerHTML = "Please enter height";
            }
            else if (!weight.value) {
                BMIStatus.innerHTML = "Please enter weight";
            }
            else {
                if (parseInt(height.value) < 110) {
                    BMIStatus.innerHTML = "Valid height should not be less than 110 cm";
                }
                else if (parseInt(height.value) > 251) {
                    BMIStatus.innerHTML = "Valid height should not be greater than 251 cm";
                }
                else {
                    if (parseInt(weight.value) < 20) {
                        BMIStatus.innerHTML = "Valid weight should not be less than 20 kg";
                    }
                    else if (parseInt(weight.value) >= 700) {
                        BMIStatus.innerHTML = "Valid weight should not be greater then 700 kg";
                    }
                    else if (parseInt(weight.value) > parseInt(height.value)) {
                        BMIStatus.innerHTML = "Weight can't be greater than height";
                    }
                    else {
                        const weightValue = parseInt(weight.value);
                        const heightValue = parseInt(height.value);
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
                }
            }
        }
        else {
            BMIStatus.innerHTML = "Please enter weight and height";
        }
    });
})();
