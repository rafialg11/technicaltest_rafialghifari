export default function Button({text, variant}) {
    return(
        <button className={`ml-4 ${variant}`}>
            {text}
        </button>
    );
}