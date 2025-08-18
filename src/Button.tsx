

type ButtonProp = {
    children: string
    disabled?: boolean
    handleCLick?: () => void,
    type: "submit" | "reset" | "button" | undefined
}


export default function Button({children, disabled, type, handleCLick}: ButtonProp)

{



    return (
        <button
            type={type}
            onClick={handleCLick}
            disabled={disabled} 
            className="disabled:cursor-not-allowed px-8 sm:px-12  py-2 sm:py-3 rounded-lg bg-gray-900 text-white w-fit text-[1rem] sm:text-[1.2rem]  cursor-pointer hover:text-gray-900 hover:bg-gray-300 border-gray-700 border-1">
            {children}
        </button>
    )
}