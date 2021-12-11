"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.json({ message: {
            "Under Weight": "less than 18.5",
            "Normal Weight": "greater than 18.5 and less than 25.0",
            "Over Weight": "greater than 25.0"
        }
    });
});
app.post('/', (req, res) => {
    const weight = req.body.weight;
    const height = req.body.height;
    if (!(weight && height)) {
        res.statusMessage = "weight and height should not be empty";
        res.status(400).end();
    }
    if (height && height < 110) {
        res.statusMessage = "valid height should not be less than 110 cm";
        res.status(400).end();
    }
    const bmi = Math.round(weight / (height / 100 * height / 100) * 10) / 10;
    let message = { status: "" };
    if (bmi < 18.5) {
        message.status = "Underweight";
    }
    else if (bmi > 25.0) {
        message.status = "Overweight";
    }
    else {
        message.status = "Normalweight";
    }
    return res.json({
        message: Object.assign(Object.assign({}, message), { bmi })
    });
});
const PORT = 3000;
app.listen(PORT, () => `server running in ${PORT}`);
