export function calculateBMI(weight: number, height: number): number{
    return Math.round(weight/ (height/100 * height/100)*10)/10
}

