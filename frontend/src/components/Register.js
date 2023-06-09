import { navigate } from '@reach/router';
import React, { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await (await fetch('http://localhost:4000/register', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })).json();

        if(!result.error){
            console.log(result.message);
            navigate('/')
        }
        else{
            console.log(result.error);
        }
    }

    // useEffect(() => {
    //     console.log(user)
    // },[user])
    

    const handleChange = e => {
        if(e.currentTarget.name === 'email'){
            setEmail(e.currentTarget.value);
        }
        else{
            setPassword(e.currentTarget.value);
        }
    }

    return (
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className='login-input'>
                <input
                        value={email}
                        onChange={handleChange}
                        type='text'
                        name='email'
                        placeholder='email'
                        autoComplete='email'
                    />
                    <input
                        value={password}
                        onChange={handleChange}
                        type='text'
                        name='password'
                        placeholder='Password'
                        autoComplete='current-password'
                    />
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register