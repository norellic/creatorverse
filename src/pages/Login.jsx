import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lockedOutSupabase } from '../client.js';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await lockedOutSupabase
      .from('Users')
      .select()
      .eq('username', username)
      .eq('password', password);
      console.log(username)
      console.log(password)
      console.log(data);
      console.log(error);

    if (error || data.length === 0) {
      alert("Login failed");
    } else {
      // Store in localStorage/sessionStorage
      localStorage.setItem('user', JSON.stringify(data[0]));
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>

      <div>No account? No problem: <Link to="/signup">Register</Link></div>
    </form>
  );
}

export default Login;