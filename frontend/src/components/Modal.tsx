type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div onClick={onClose} className="fixed left-0 top-0 flex flex-col justify-center items-center w-full h-screen px-2 pt-15 pb-30 bg-black/50 ">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl flex-1 bg-zinc-800 rounded-lg">
                {children}
            </div>
        </div>
    )
}

export default Modal