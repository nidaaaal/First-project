import * as yup from 'yup'
export const regval= yup.object({
    username:yup.string().required('username is required'),
    email:yup.string().email('Invalid email').required('email is required'),
    password:yup.string()
    .min(8,'password must be at least 8 charecters')
    .matches(/[A-Z]/,'must include a uppercase letter')
    .matches(/[a-z]/,'must include a lowercase letter')
    .matches(/\d/,'must include a number')
    .matches(/[@$%&*!]/,'must include a special charecter')
    .required('password is required'),
    confirmpassword:yup.string()
    .oneOf([yup.ref('password')],'password matches')
    .required('confirmpassword is required')
})

export const logval=yup.object({
    email:yup.string().required('email required'),
    password:yup.string().required('password is required')
})