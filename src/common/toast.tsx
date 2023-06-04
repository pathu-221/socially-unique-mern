import toast, { Toast } from 'react-hot-toast';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillInfoCircle, AiFillWarning } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import Loader from '@/components/Loader';

type toastType = "info" | "success" | "warning" | "error" | "loading";



export const showToast = (type: toastType, message: string) => {


    let classNames = 'alert';
    let Icon: IconType;

    switch (type) {
        case 'info':
            Icon = AiFillInfoCircle
            break;
        case 'error':
            Icon = RiErrorWarningFill;
            break;
        case 'success':
            Icon = BsFillCheckCircleFill;
            break;
        case 'warning':
            Icon = AiFillWarning;
            break;
    }

    if (type === 'loading') {
        return toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}max-w-xs`}>
                <div className={`alert alert-info flex items-center justify-center`}>
                    <Loader />
                    <span> {message} </span>
                </div>
            </div>
        ))
    }

    toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}max-w-xs`}>
            <div className={`alert alert-${type}`}>
                <Icon size={25} />
                <span> {message} </span>
            </div>
        </div>
    ), { duration: 10000 })
}