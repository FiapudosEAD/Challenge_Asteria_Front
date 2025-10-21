export default function Table({ data }) {
  return (
    <table className="w-full bg-white rounded shadow overflow-hidden text-center">
      <thead className="bg-black text-white text-sm uppercase">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">ID PDV</th>
          <th className="p-2">ID Produto</th>
          <th className="p-2">Tipo</th>
          <th className="p-2">Valor</th>
          <th className="p-2">Quantidade</th>
          <th className="p-2">Data Venda</th>
        </tr>
      </thead>
      <tbody>
        {data.map((v) => (
          <tr key={v.id} className="hover:bg-gray-200 transition-colors">
            <td className="p-2">{v.id}</td>
            <td className="p-2">{v.idPDV}</td>
            <td className="p-2">{v.idProduto}</td>
            <td className="p-2">{v.tipo}</td>
            <td className="p-2">{v.valor}</td>
            <td className="p-2">{v.qtd}</td>
            <td className="p-2">{v.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
