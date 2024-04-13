const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { z } = require("zod"); 


const { JWT_SECRET } = require("../config");
const studentRouter = require("./Student");
const courseRouter = require("./course");


const router = express.Router();
router.use("/student",studentRouter);
router.use("/course",courseRouter);



const loginBody = z.object({
    username: z.string().min(6),
    password: z.string().min(6)
});

router.post("/", async (req, res) => {
    const { success } = loginBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: "Bearer " + token
        });
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

module.exports = router;
