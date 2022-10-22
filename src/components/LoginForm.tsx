import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useState } from 'react'
import { Context } from '..'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context)

    const handleLogin = () => {
        store.login(email, password)
    }

    const handleRegistration = () => {
        store.registration(email, password)

    }


    return (
        <div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                placeholder='Email' />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password' />

            <button onClick={handleLogin}>Sign in</button>
            <button onClick={handleRegistration}>Sign up</button>
        </div>
    )
}

export default observer(LoginForm)