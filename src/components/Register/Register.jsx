import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../Firebase/Firebase.config';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);
    // reset error
    setRegisterError('');
    setSuccess('');

    if (password.length < 6) {
      setRegisterError('Password should be at least 6 characters or longer');
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        'Your password should have at least one uppercase characters.'
      );
      return;
    } else if (!accepted) {
      setRegisterError('Please accept our terms and condition');
      return;
    }
    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setSuccess('User Created Successfully.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setRegisterError(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <div>
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-8">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full rounded-lg py-2 px-4"
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            required
          />
          <br />
          <div className="relative mb-4">
            <input
              className="w-full rounded-lg py-2 px-4"
              type={showPassword ? 'text' : 'password'}
              name="password"
              id=""
              placeholder="Password"
              required
            />
            <span
              className="absolute top-3 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <br />
          <div>
            {' '}
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              Accept our <a href="">Terms and condition</a>
            </label>
          </div>
          <br />
          <input
            className="btn btn-secondary mb-4 w-full rounded-lg"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className=" text-red-700">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
        <p>
          New to this website Please{' '}
          <Link className="text-green-400 underline" to={'/login'}>
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
