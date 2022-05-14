import './Button.scss';

type ButtonProps = {
    className?: string;
    text?: string;
    image?: string;
    onClick: () => void;
};

function Button(props: ButtonProps) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.text ? <label>{props.text}</label> : null}
            {props.image ? <img src={props.image} /> : null}
        </button>
    );
}

export default Button;
