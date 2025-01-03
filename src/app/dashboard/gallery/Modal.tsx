const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="p-4">
                    <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;