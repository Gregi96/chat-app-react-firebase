import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signup, signInWithGitHub } from '../../helpers/auth';

const Signup = () => {
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
      await signup(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  const githubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
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
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
            className="form-control"
          ></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button
            className="btn btn-primary btn-lg btn-block mt-4 mb-3"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <p className="text-center">Or</p>
        <button
          onClick={googleSignIn}
          type="button"
          className="btn btn-info btn-lg btn-block"
        >
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={githubSignIn}
          className="btn btn-info btn-lg btn-block"
        >
          Sign up with GitHub
        </button>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
