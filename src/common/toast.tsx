import toast, { Toast } from 'react-hot-toast';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillInfoCircle, AiFillWarning } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import Loader from '@/components/Loader';

type toastType = "info" | "success" | "warning" | "error" | "loading";



export const showToast = (type: toastType, message: string) => {


    let classNames = `alert`;
    let Icon: IconType;

    switch (type) {
        case 'info':
            Icon = AiFillInfoCircle;
            classNames = 'alert alert-info';
            break;
        case 'error':
            Icon = RiErrorWarningFill;
            classNames = 'alert alert-error';
            break;
        case 'success':
            Icon = BsFillCheckCircleFill;
            classNames = 'alert alert-success';
            break;
        case 'warning':
            Icon = AiFillWarning;
            classNames = 'alert alert-warning';
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
            <div className={ classNames }>
                <Icon size={ 25 } />
                <span> {message} </span>
            </div>
        </div>
    ))
}