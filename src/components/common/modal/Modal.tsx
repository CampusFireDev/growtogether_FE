interface ModalProps {
    children: React.ReactNode;
}

const Modal = ({ children }:ModalProps ):JSX.Element =>{
    return(
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-90 flex justify-center items-center"></div> 
            
            {/* 모달 콘텐츠 */}
            <div className="fixed inset-0 flex justify-center items-center z-100">
                <div className="max-w-[450px] max-h-[450px] p-[20px] flex flex-col justify-center items-center gap-7 rounded-[10px] bg-white z-100">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal;