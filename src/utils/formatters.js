
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "R$ 0,00";
  if (typeof value !== 'number') value = parseFloat(value);
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatDate = (dateString) => {
   if (!dateString) return "-";

   return new Date(dateString).toLocaleDateString("pt-BR", { timeZone: 'UTC' });
};