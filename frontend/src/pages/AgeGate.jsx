
export default function AgeGate(){
  return (
    <div>
      <h1>Adults Only (18+)</h1>
      <button onClick={()=>{localStorage.setItem('isAdult','true'); location.reload();}}>
        I am 18 or older
      </button>
    </div>
  );
}
