import { useChess } from "../context/ChessContext";

const avatars = [
  { src: "/m1.svg" },
  { src: "/m2.svg" },
  { src: "/m3.svg" },
  { src: "/m4.svg" },
  { src: "/m5.svg" },
  { src: "/m6.svg" },
  { src: "/m7.svg" },
  { src: "/m8.svg" },
  { src: "/w1.svg" },
  { src: "/w2.svg" },
  { src: "/w3.svg" },
  { src: "/w4.svg" },
  { src: "/w5.svg" },
  { src: "/w6.png" },
  { src: "/w7.svg" },
  { src: "/w8.svg" },
];

export default function ChooseAvatar() {
  const { dispatch } = useChess();

  function handleClick(src: string) {
    console.log("clicked");
    dispatch({ type: "SET_OPEN_CHOOSEAVATAR_DIV_FALSE" });
    dispatch({ type: "SET_PLAYER_IMAGE", payload: src });
  }
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center rounded-2xl shadow-white shadow-sm opacity-90 gap-y-[10%] sm:gap-y-[8%]"
      style={{
        background:
          'linear-gradient(rgba(20,16,36,.75), rgba(20,16,36,.85)), url("https://bigthink.com/wp-content/uploads/2022/01/AdobeStock_236786791.jpeg") center / cover fixed no-repeat',
        backgroundColor: "#141024",
        color: "#f5f5f7",
      }}
    >
      <h2 className=" text-gray-100  justify-self-center self-center text-[1rem] sm:text-[1.2rem] mt-[5%]">
        Wähle dein Avatar aus
      </h2>
      <ul className="grid grid-rows-4  grid-cols-4  gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-5 sm:gap-y-6  justify-self-center self-center">
        {avatars.map((avatar, index) => (
          <img
            src={avatar.src}
            key={index}
            onClick={() => handleClick(avatar.src)}
            className="bg-white w-[4rem] sm:w-[5rem] lg:w-[4rem] h-[4rem] sm:h-[5rem] lg:h-[4rem] rounded-full ring-2 hover:ring-[3px] ring-orange-300 hover:ring-amber-300 cursor-pointer hover:border-2 hover:opacity-90"
          />
        ))}
      </ul>
    </div>
  );
}
