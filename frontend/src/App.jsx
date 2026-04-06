import AgeGate from './pages/AgeGate.jsx';
import Login from './pages/Login.jsx';
import Feed from './pages/Feed.jsx';

export default function App() {
  const isAdult = localStorage.getItem('isAdult');
  const token = localStorage.getItem('token');

  
if (!isAdult) return <AgeGate />;
if (!token) return <Login />;
return <Feed />;
}
