import { Router } from "express";
import {AuthController} from '../controllers/auth.controller'
import { loginValidation, registerValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";
const router = Router()

const authController = new AuthController()

router.post('/login', loginValidation, ValidationMiddleware, AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/register', registerValidation, ValidationMiddleware, authController.register)
router.get('/user', isAuthenticate, AuthController.getAuthenticatedUser);

export default router