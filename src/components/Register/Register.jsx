import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../Firebase/Firebase.config';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
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
      <div className="mx-auto md:w-1/2 text-center">
        <h2 className="text-3xl mb-8">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-3/4 py-2 px-4"
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            required
          />
          <br />
          <input
            className="mb-4 w-3/4 py-2 px-4"
            type={showPassword ? 'text' : 'password'}
            name="password"
            id=""
            placeholder="Password"
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </span>
          <br />
          <input
            className="btn btn-secondary mb-4 w-3/4"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className=" text-red-700">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
