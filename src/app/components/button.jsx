'use client';
export default function Button({ text, variant, onClick }) {
  return (
    <button className={`ml-4 ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
}
