export default function LoadingDots() {
  return (
    <span className="flex space-x-1 sm:space-x-2 items-end justify-end bg-green mt-3">
      <span className="w-1 sm:w-2 lg:w-3  h-1 sm:h-2 lg:h-3 bg-cyan-50 rounded-full animate-bounce"></span>
      <span className="w-1 sm:w-2 lg:w-3  h-1 sm:h-2 lg:h-3 bg-cyan-50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-1 sm:w-2 lg:w-3  h-1 sm:h-2 lg:h-3 bg-cyan-50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    </span>
  );
}