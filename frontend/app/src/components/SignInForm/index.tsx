// Style
import './index.scss';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { buttonTheme, checkboxTheme, textInputTheme } from '../../style/flowbiteThemes';

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Server
import { useSignInMutation } from '../../api/authenticationsSlice';

// Form validation
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Libraries
import toast from 'react-hot-toast';

// Redux
import { useAppDispatch } from '../../hooks/state';
import { setAccessToken, setIsAuthenticated } from '../App/appSlice';

// Interfaces
import { SignInError } from './interfaces';

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    // Signing in
    const [signIn, {error, isError, isSuccess}] = useSignInMutation();

    // Form validation
    const schema = yup.object().shape({
        email: yup.string().required('This field is required'),
        password: yup.string().required('This field is required'),
        remember: yup.boolean()
    });

    const { control, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (formData: {email: string, password: string, remember?: boolean}) => {
        signIn(formData)
        .unwrap()
        .then((data) => {
            toast('Successfully signed in', {
                icon: '🥳'
            });
            localStorage.setItem("access_token", data.access_token);
            dispatch(setAccessToken(data.access_token));
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("expires_in", `${data.expires_in}`);
            if (formData.remember) {
                localStorage.setItem("remember", "true");
            };

            dispatch(setIsAuthenticated(true));
            navigate('/');
        })
        .catch((error: SignInError) => {
            console.error(error);
            toast(error.data.error_description === "Invalid credentials given." ? 'E-mail or password are incorrect' : 'Oops! Something get wrong', {
                icon: '😰'
            });
        });
    };

    return (
        <div className="login-form">
            <h1 className='login-form__title'>Sign in</h1>
            <div className='login-form__subtitle'>
                <h2>New to Croissant?</h2>
                <p onClick={() => navigate('/signup')}>Sign up</p>
            </div>
            <form className='login-form__form' onSubmit={handleSubmit(onSubmit)}>
                <div className='login-form__element'>
                    <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextInput
                                theme={textInputTheme}
                                placeholder='Email'
                                type='email'
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                    <span className="text-[14px] text-red-500 leading-none">{errors.email?.message}</span>
                </div>
                <div className='login-form__element'>
                    <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextInput
                                theme={textInputTheme}
                                placeholder='Password'
                                type='password'
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                    <span className="text-[14px] text-red-500 leading-none">{errors.password?.message}</span>
                </div>
                <div className='login-form__element login-form__remember'>
                    <Controller
                        name='remember'
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="remember-me"
                                theme={checkboxTheme}
                                onChange={(e) => {
                                    field.onChange(e.target.checked);
                                }}
                            />
                        )}
                    />
                    <Label htmlFor="remember-me" className="flex">Remember me</Label>
                </div>
                <Button theme={buttonTheme} type='submit'>Sign in</Button>
            </form>
        </div>
    );
}

export default LoginForm;