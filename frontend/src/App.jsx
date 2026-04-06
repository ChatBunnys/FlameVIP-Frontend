import AgeGate from './pages/AgeGate.jsx';
import Login from './pages/Login.jsx';
import Feed from './pages/Feed.jsx';

export default function App() {
  const isAdult = localStorage.getItem('isAdult');
  const token = localStorage.getItem('token');

  // If user hasn't confirmed they're an adult, show age gate
  if (!isAdult) return <AgeGate />;
  
  // If user isn't logged in, show login
  if (!token) return <Login />;
  
  // Otherwise show the feed
  return <Feed />;
}
