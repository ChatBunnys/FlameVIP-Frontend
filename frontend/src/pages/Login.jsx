
export default function Login(){
  const login = () => {
    localStorage.setItem('token','mock-token');
    location.reload();
  };
  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login (Mock)</button>
    </div>
  );
}
