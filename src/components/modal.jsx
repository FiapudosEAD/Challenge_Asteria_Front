import { useEffect, useState } from "react";
import Input from "./Input";
import ComboBox from "./ComboBox";
import Button from "./buttons";

export default function Modal({ title, fields, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="bg-black/[30%] h-screen fixed inset-0 z-40">
      <form className="w-[100%] h-screen bg-white ml-auto md:w-[40%] lg:w-[25%]">
        <h1 className="w-full text-center bg-zinc-900 text-amber-400 text-2xl font-semibold p-4">
          {title}
        </h1>
        <div className="m-12 flex flex-col gap-6">
          {/* Campos dinamicos */}
          {fields.map((field, index) => {
            if (field.type === "text" || field.type === "number") {
              return (
                <Input
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              );
            }

            if (field.type === "select") {
              return <ComboBox type={field.comboType} options={field.options} />;
            }

            return null;
          })}
          <div className="w-full flex gap-5">
            <Button type={"button"} message={"Salvar"} />
            <Button type={"button"} message={"Voltar"} action={onClose} />
          </div>
        </div>
      </form>
    </div>
  );
}
