import React from 'react'
import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

// import { Router } from "express"; // Use ES Module import syntax
// const userRouter = Router();

 const userRouter = express.Router()

userRouter.post("/register",registerUser);

userRouter.post('/login',loginUser)

export default userRouter