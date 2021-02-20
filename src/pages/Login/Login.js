import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../../helpers/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>
            Login to
            <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to login to your account</p>
        </div>

        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
            className="form-control"
          ></input>
        </div>

        <input
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
          type="password"
          className="form-control"
        ></input>

        <div>
          {error ? <p>{error}</p> : null}
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block mt-4"
          >
            Login
          </button>
        </div>

        <hr></hr>
        <p className="text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
