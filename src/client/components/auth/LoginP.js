import React from 'react';

//Components
import Message from '../layout/Message';

const Login = props => {
    const { email, password } = props.data;
    const {  handleChange: { setPassword, setEmail }, handleSubmit, error } = props;
    return (
        <div className="form form-auth">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <Message type="danger" message={error}/>}
                <label htmlFor="email">Email</label> <br/>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} required/> <br/>

                <label htmlFor="password">Password</label> <br/>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required /> <br/>
                <button>Login</button> 

            </form>
        </div>
    )
}

export default Login;
