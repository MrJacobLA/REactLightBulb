import { useState } from "react"; // Importt für den React-Hook „useState“ für Zustände

// Die Glühbirnen-Komponente bekommt über props gesagt, ob sie an oder aus ist
const LightBulb = ({ isOn }) => {
  return (
    // Wenn „isOn“ true ist, fügen wir die CSS-Klasse „night“ hinzu → das macht die Birne gelb/leuchtend
    <div className={`container ${isOn ? "night" : ""}`}>
      <div className="bulb-light">
        <div id="light" />
        <div id="bulb">
          <div className="bulb-top">
            <div className="reflection" />
          </div>
          <div className="bulb-middle-1" />
          <div className="bulb-middle-2" />
          <div className="bulb-middle-3" />
          <div className="bulb-bottom" />
        </div>

        <div id="base">
          <div className="screw-top" />
          <div className="screw-a" />
          <div className="screw-b" />
          <div className="screw-a" />
          <div className="screw-b" />
          <div className="screw-a" />
          <div className="screw-b" />
          <div className="screw-c" />
          <div className="screw-d" />
        </div>
      </div>
    </div>
  );
};
// Die Hauptkomponente meiner App
const App = () => {
  // Zustand: Ist die Glühbirne an?
  const [isOn, setIsOn] = useState(false);
  // Zustand: Wie oft wurde die Birne angeschaltet?
  const [count, setCount] = useState(0);
  // Wie oft darf man maximal einschalten?
  const maxUses = 10;
  // Wenn man auf den Schalter klickt:
  const handleToggle = () => {
    // Wenn das Maximum erreicht wurde, darf man nichts mehr tun
    if (count >= maxUses) return;
    // Glühbirne an oder aus schalten (umdrehen des aktuellen Zustands)
    const next = !isOn;
    setIsOn(next);
    // Nur wenn man sie gerade AN schaltet → Zähler hochzählen
    if (next) setCount((prev) => prev + 1);
  };
  // Zurücksetzen-Knopf: Zähler auf 0 und Birne aus
  const handleReset = () => {
    setCount(0);
    setIsOn(false);
  };
  // Beschriftung des Schalters (je nach Status)
  const buttonText =
    count >= maxUses ? "Gesperrt" : isOn ? "Ausschalten" : "Einschalten";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#007398] text-white px-4">
      {/* Die Glühbirne bekommt den Status mitgeteilt */}
      <LightBulb isOn={isOn} />

      <div className="mt-10 flex gap-4 flex-col sm:flex-row items-center">
        {/* EIN/AUS Button */}
        <button
          onClick={handleToggle}
          className={`px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 ${
            count >= maxUses
              ? "bg-gray-500 cursor-not-allowed"
              : isOn
              ? "bg-yellow-500 hover:bg-yellow-400"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {buttonText}
        </button>
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-lg text-lg font-semibold bg-red-500 hover:bg-red-400 transition duration-300"
        >
          Zurücksetzen
        </button>
      </div>
      {/* Warnung, wenn man zu oft eingeschaltet hat */}
      {count >= maxUses && (
        <p className="mt-4 text-red-300 font-medium">
          ⚠️ Maximale Nutzung erreicht! Bitte zurücksetzen.
        </p>
      )}
    </div>
  );
};

export default App;
