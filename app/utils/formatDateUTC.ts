export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .reverse()
    .join('-'); // Chuyển DD/MM/YYYY → YYYY-MM-DD
};
