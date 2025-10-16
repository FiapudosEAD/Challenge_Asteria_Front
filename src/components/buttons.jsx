export default function Button({ type, action, message }) {
  return (
    <button
      type={type}
      onClick={action ? action : null}
      className="w-full p-2 rounded-md bg-amber-400 text-zinc-900 font-semibold cursor-pointer hover:bg-amber-500 duration-300"
    >
      {message}
    </button>
  );
}
