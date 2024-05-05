export default function Input({label, placeholder, type, state, func}) {
    return(
        <>
            <label className={'text-xs mb-1.5 font-medium'}>{label}</label>
            <input
                className={`text-sm w-96 mb-5 py-2 pl-3 rounded-md border-solid border-2 border-slate-300 ${state}`}
                type={type}
                placeholder={placeholder}
                onChange={func}
            />
        </>
    );
}