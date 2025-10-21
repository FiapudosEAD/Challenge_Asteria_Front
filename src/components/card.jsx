export default function Card({ title, value }) {
  return (
    <div className="bg-yellow-500 text-black p-4 rounded shadow text-center">
      <span className="block text-base mb-2">{title}</span>
      <span className="font-bold text-2xl">{value}</span>
    </div>
  );
}
