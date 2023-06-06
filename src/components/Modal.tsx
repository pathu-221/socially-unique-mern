import { FC, ReactNode } from "react";


interface ModalProps {
    id: string,
    children: ReactNode
}
 
const Modal: FC<ModalProps> = ({ id, children }) => {
    return ( 
        <>
        <input type="checkbox" id={id} className="modal-toggle" />
        <label htmlFor={id} className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
                { children }
            </label>
        </label>
        </>
    );
}
 
export default Modal;