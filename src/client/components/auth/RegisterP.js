import React from 'react';

//Components
import Message from '../layout/Message';

const RegisterContainer = props => {
    const { email, password, passwordRepeat } = props.data;
    const { handleChange: { setEmail, setPassword, setPasswordRepeat }, handleSubmit, error, message } = props;
    return (
        <div className="form form-auth">
            <form onSubmit={handleSubmit}>
                {error && <Message type="danger" message={error}/>}
                {message && <Message type="success" message={message}/>}
                <h1>Register</h1>                
                <label htmlFor="email">Email</label> <br/>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                /><br/>
                
                <label htmlFor="password">Password</label> <br/>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                /><br/>

                <label htmlFor="passwordRepeat">Repeat password</label> <br/>
                <input 
                    type="password" 
                    id="passwordRepeat" 
                    value={passwordRepeat} 
                    onChange={e => setPasswordRepeat(e.target.value)} 
                    required
                /><br/>
                <button>Register</button>
            </form>
        </div>
    );
};

export default RegisterContainer;