import Button from "./buttons";

export default function Modal({ title, isOpen, onClose, onSubmit, fields, children }) {
  if (!isOpen) return null;

  return (
    <div className="bg-black/[30%] h-screen fixed inset-0 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <h1 className="w-full text-center bg-zinc-900 text-amber-400 text-2xl font-semibold p-4 sticky top-0">
            {title}
          </h1>
          
          <div className="m-8 flex flex-col gap-6">
            {fields?.map((field, index) => {
              if (field.type === "text" || field.type === "number") {
                return (
                  <Input
                    key={index}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                );
              }
              return null;
            })}
            
            {children}
            
            <div className="w-full flex gap-5 mt-4">
              <Button type={"submit"} message={"Salvar"} />
              <Button type={"button"} message={"Voltar"} action={onClose} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}