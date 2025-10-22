import { MdEdit, MdDelete } from "react-icons/md";

export default function Table({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  showActions = true 
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-800 text-white">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                  >
                    {column.render 
                      ? column.render(row[column.accessor], row) 
                      : row[column.accessor]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex gap-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-amber-500 hover:text-amber-600 transition-colors"
                          title="Editar"
                        >
                          <MdEdit size={20} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Excluir"
                        >
                          <MdDelete size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="p-4 hover:bg-gray-50">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex justify-between py-2">
                <span className="font-semibold text-gray-700 text-sm">
                  {column.header}:
                </span>
                <span className="text-gray-900 text-sm text-right">
                  {column.render 
                    ? column.render(row[column.accessor], row) 
                    : row[column.accessor]}
                </span>
              </div>
            ))}
            {showActions && (
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-200">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="flex-1 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MdEdit size={18} />
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MdDelete size={18} />
                    Excluir
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhum registro encontrado
        </div>
      )}
    </div>
  );
}
