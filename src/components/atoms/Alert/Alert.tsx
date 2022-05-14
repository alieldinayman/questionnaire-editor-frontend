import './Alert.scss';
import { useEffect, useState } from 'react';

type AlertProps = {
    triggerAlert: boolean;
    onAlertExpire: () => void;
    text: string;
    duration: number;
    isError: boolean;
};

function Alert(props: AlertProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.triggerAlert) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                props.onAlertExpire();
            }, props.duration);

            return () => clearTimeout(timer);
        }
    }, [props.triggerAlert]);

    const alertClasses = `alert ${visible ? 'is-active' : ''} ${props.isError ? 'is-error' : ''}`;
    return <div className={alertClasses}>{props.text}</div>;
}

export default Alert;
