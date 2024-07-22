import * as yup from 'yup';

export const registerFormValidation = yup.object().shape({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Invalid email").required("Email is required!"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
});

export const loginFormValidation = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required!"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
})