import {body} from 'express-validator'

export const registerValidation =[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:4}).withMessage('Password too short'),
    body('name').notEmpty().withMessage('Name required')
]

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required')
]

export const offerValidation = [
    body('nombre')
        .isLength({min:1,max:40}).withMessage('Titulo mas de 4 caracteres'),
    body('descripcion').optional().isLength({max:2000}),
]

export const categoryValidation = [
    body('name').notEmpty().withMessage('Name required')
]

export const rateValidation = [
    body('value').isInt({min:0, max:5}).toInt().withMessage('Value is required')
]
//...