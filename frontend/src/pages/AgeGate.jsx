export default function AgeGate() {
  const handleConfirm = () => {
    localStorage.setItem('isAdult', 'true');
    window.location.reload();
  };

  return (
    <div>
      <h1>Adults Only (18+)</h1>
      <button onClick={handleConfirm}>
        I am 18 or older
      </button>
    </div>
  );
}
