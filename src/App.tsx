import PhaserGame from "./PhaserGame";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-sky-900">
      <h1 className="p-10 font-bold text-slate-100 text-5xl">Medieval Alien</h1>
      <PhaserGame />
    </div>
  );
}

export default App;
