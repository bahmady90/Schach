import { useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  /* onClose: () => void; */
  children: ReactNode;
};

function Modal({ open, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#050218]  flex justify-center items-center w-full h-full z-40">
      <div
        ref={modalRef}
        className="bg-stone-200 p-0 rounded-3xl w-[90%] sm:w-[70%] lg:w-[60%] h-[80%] max-h-[500px] sm:max-h-[800px]"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
