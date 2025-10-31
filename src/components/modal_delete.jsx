import Button from "./buttons";

export default function ModalDelete({ message, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="bg-black/[30%] h-screen fixed inset-0 z-40 flex justify-center items-center">
      <div className="px-12 py-12 rounded-lg bg-white w-[80%] md:w-[35%] lg:w-[30%]">
        <h2 className="mb-6 text-center text-lg font-medium">{message}</h2>
        <span className="flex gap-5">
          <Button message={"Não"} action={onClose} />
          <Button message={"Sim"} action={onConfirm} />
        </span>
      </div>
    </div>
  );
}