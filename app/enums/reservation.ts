export enum ConsultationType {
  CONSULTATION = 'CONSULTATION',
  CONTACT = 'CONTACT',
}

export const CONSULTATION_TYPES_LABEL: Record<ConsultationType, string> = {
  [ConsultationType.CONSULTATION]: 'Tư Vấn',
  [ConsultationType.CONTACT]: 'Liên Hệ',
};

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  [ReservationStatus.PENDING]: 'Chờ xử lý',
  [ReservationStatus.CONFIRMED]: 'Đã hoàn tất',
  [ReservationStatus.CANCELLED]: 'Đã hủy',
};

export const STATUS_STYLES: Record<ReservationStatus, string> = {
  [ReservationStatus.PENDING]: 'bg-gray-500 text-white',
  [ReservationStatus.CONFIRMED]: 'bg-green-500 text-white',
  [ReservationStatus.CANCELLED]: 'bg-red-500 text-white',
};
