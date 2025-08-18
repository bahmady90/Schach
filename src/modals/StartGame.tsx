import { useState, type ChangeEvent } from "react";
import Button from "../Button";
import { useChess } from "../context/ChessContext";

export default function StartGame() {
  const { dispatch, dataPlayer } = useChess();
  const [error, setError] = useState("");

  const isError = error !== "";

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    if (name) {
      dispatch({ type: "SET_PLAYER_NAME", payload: name });
      setError("");
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dataPlayer.name.trim()) {
      setError("Bitte gib einen Namen ein");
      return; // frühzeitig abbrechen
    }
    // Kein Fehler => Spiel starten
    setError("");
    dispatch({ type: "SET_GAMESTATE", payload: "active" });
  };

  return (
    <div
      className="min-h-full rounded-2xl shadow-white shadow-sm flex flex-col items-center  justify-center gap-y-2 sm:gap-y-3 lg:gap-y-4 "
      style={{
        background:
          'linear-gradient(rgba(20,16,36,.75), rgba(20,16,36,.85)), url("https://bigthink.com/wp-content/uploads/2022/01/AdobeStock_236786791.jpeg") center / cover fixed no-repeat',
        backgroundColor: "#141024",
        color: "#f5f5f7",
      }}
    >
      <h1
        className={`text-[#f5f5f7]  text-center text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] font-semibold bg-none`}
      >
        Schachspiel
      </h1>
      {/* Bühne */}
      <form
        className="relative mx-auto grid gap-4 items-center justify-items-center px-8 pb-8 minh-stage
                        max-w-[1100px] grid-cols-1
                        lg:[grid-template-columns:auto_minmax(0,min(70vmin,640px))_auto]"
        onSubmit={handleSubmit}
      >
        {/* Spieler */}
        <div className="flex flex-col items-center gap-3 order-1 lg:order-none">
          <label
            onClick={() => dispatch({ type: "SET_OPEN_CHOOSEAVATAR_DIV_TRUE" })}
            htmlFor="avatar"
            title="Avatar wählen"
            className="w-[5rem] sm:w-[7rem] lg:w-[8rem] h-[5rem] sm:h-[7rem] lg:h-[8rem] rounded-full overflow-hidden border-2 border-[#333] bg-[#ddd] grid place-items-center cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,.25)]"
          >
            <img
              src={dataPlayer.img}
              alt="Spieler Avatar"
              className="w-full h-full object-cover block hover:opacity-80 hover:ring-1 hover:ring-amber-300"
            />
          </label>
          {/* <input id="avatar" name="avatar" type="file" accept="image/*" hidden /> */}
          <div className="flex flex-col items-center">
            <input
              onChange={handleChange}
              id="playerName"
              name="player"
              type="text"
              placeholder="Dein Name"
              className="text-black w-full h-[2rem] sm:h-[2.5rem] border-2 border-[#333] rounded-lg bg-white text-center font-semibold shadow-[0_6px_18px_rgba(0,0,0,.2)]"
            />
            <p className="text-red-400 text-[0.7rem] sm:text-[1rem]">{error}</p>
          </div>
        </div>

        {/* Mitte */}
        <div className="text-[20px] sm:text-[30px] lg:text-[35px] font-black text-[#f5f5f7] select-none order-2 lg:order-none [text-shadow:0_2px_14px_rgba(0,0,0,.45)]">
          VS.
        </div>

        {/* Gegner */}
        <div className="flex flex-col items-center gap-3 order-3 lg:order-none">
          <div className="w-[5rem] sm:w-[7rem] lg:w-[8rem] h-[5rem] sm:h-[7rem] lg:h-[8rem] rounded-full overflow-hidden border-2 border-[#333] bg-[#ddd] grid place-items-center shadow-[0_6px_18px_rgba(0,0,0,.25)]">
            <img
              src="../../sheeva.png"
              alt="Bot Avatar"
              className="w-full h-full object-cover block"
            />
          </div>
          <input
            type="text"
            value="Sheevá"
            disabled
            readOnly
            className="w-full py-1 sm:py-2 border-2 border-[#333] rounded-lg bg-[#eee] text-[#666] text-center font-semibold shadow-inner"
          />
        </div>

        {/* Start */}
        <div className="order-4 lg:order-none lg:col-start-2 mt-[10%]">
          <Button disabled={isError} type="submit">
            Start
          </Button>
        </div>
      </form>
    </div>
  );
}
