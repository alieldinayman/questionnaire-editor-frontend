import '@/components/atoms/Button.scss';

type ButtonProps = {
    className?: string;
    text?: string;
    onClick: () => void;
};

function Button(props: ButtonProps) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.text ? <label>{props.text}</label> : null}
        </button>
    );
}

export default Button;