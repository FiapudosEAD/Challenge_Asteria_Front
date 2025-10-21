export default function InfoBox({ children }) {
  return (
    <div className="bg-blue-500 text-white p-4 rounded shadow max-w-xs w-full text-sm">
      {children}
    </div>
  );
}
