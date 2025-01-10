import { object, string } from 'zod';


export const registerSchema = object({
  name: string().min(1, 'Name must be at least one character'),
  email: string().email('Invalid email'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be less than 30 characters'),
  confirmPassword: string()
    .min(8, 'Confirm password must be at least 8 characters')
    .max(30, 'Confirm password must be less than 30 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});



export const SignInSchema = object({
    email: string().email('invalid email'),
    password: string().min(8, 'password must be more then 8 characters').max(30, 'password must be at least 30 characters'),
  });
  