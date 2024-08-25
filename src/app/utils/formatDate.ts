export const formatDate = (date: any) => {
    const data = new Date(date);
    if (isNaN(data.getTime())) return '';
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    return formatter.format(data);
}