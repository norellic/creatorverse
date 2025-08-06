import { useState } from 'react';
import { lockedOutSupabase } from '../client.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // TODO: hash password in real apps
    const { data, error } = await lockedOutSupabase
      .from('Users')
      .insert([{ username, password }]);

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      alert("User registered!");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
      <div>Already have an account?<Link to="/login">Login</Link></div>
    </form>
  );
}

export default SignUp;
