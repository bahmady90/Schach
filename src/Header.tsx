

export default function Header()
{
    




    return (
        <header className="grid h-full  z-60">
            <div className="p-1 rounded-b-2xl overflow-hidden w-full justify-self-center self-center relative h-full flex items-center justify-center px-4 z-[60] before:content-[''] before:absolute before:inset-0 before:bg-[repeating-conic-gradient(#a0b0b4_0%_25%,#1f1b2d_0%_50%)] before:bg-[length:28px_28px] sm:before:bg-[length:35px_35px]  before:opacity-45 shadow-gray-700 shadow-2xs">
                <div className=" relative flex items-center gap-[5px] sm:gap-[10px] lg:gap-[15px] whitespace-nowrap leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                    <span className="text-white text-[18px] sm:text-[30px] lg:text[30px] tracking-[4px] [text-shadow:0_1px_0_rgba(0,0,0,0.6)]">♖♘♗♕♔♗♘♖</span>
                    <span className="text-white text-[18px]">•</span>
                    <span className="text-[#9cb0ff] text-[18px] sm:text-[30px] lg:text[30px] tracking-[4px] [text-shadow:0_1px_0_rgba(0,0,0,0.35)]">♜♞♝♛♚♝♞♜</span>
                </div>
            </div>
        </header>
    )
}