export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formater = new Intl.DateTimeFormat("id-ID",{
    dateStyle: "medium"
  } );
  return formater.format(date);
}

export const formatPrice = (amount: number) => {
  const formater = new Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Menghindari angka desimal
    maximumFractionDigits: 0
  });
  return formater.format(amount);
};

