import path from "path";

import { __layout_main } from "../settings.js";

export const home = (req, res) => {
    res.status(200).json({
        "status": "Ok",
        "message": "Welcome to Wasibook API interface"
    });
};

export const about = (req, res) => {
    res.status(200).json({
        "status": 200,
        "message": "You can use me to get Wasibook data."
    })
};