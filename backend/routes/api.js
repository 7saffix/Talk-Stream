import express from 'express'
import { login, logout, signup } from '../controllers/userController.js'

const route =express.Router()

//user api
route.post('/signup',signup)
route.post('/login',login)
route.post('/logout',logout)

export default route