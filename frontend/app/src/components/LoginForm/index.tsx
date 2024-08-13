import './index.scss';

import { Button, TextInput } from 'flowbite-react';

import { buttonTheme, textInputTheme } from '../../style/flowbiteThemes';

function LoginForm() {
  return (
    <div className="login-form">
        <h1 className='login-form__title'>Sign in</h1>
        <div className='login-form__subtitle'>
            <h2>New to AutoChatBot?</h2>
            <a href='#'>Sign up</a>
        </div>
        <form className='login-form__form'>
            <TextInput theme={textInputTheme} placeholder='Email'/>
            <TextInput theme={textInputTheme} placeholder='Password'/>
            <Button theme={buttonTheme}>Sign in</Button>
        </form>
    </div>
  );
}

export default LoginForm;