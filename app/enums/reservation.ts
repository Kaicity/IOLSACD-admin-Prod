export enum ConsultationType {
  STUDY_ABROAD = 'STUDY_ABROAD',
  CAREER = 'CAREER',
  FINANCE = 'FINANCE',
  HEALTH = 'HEALTH',
  LEGAL = 'LEGAL',
}

export const CONSULTATION_TYPES_LABEL: Record<ConsultationType, string> = {
  [ConsultationType.STUDY_ABROAD]: 'Tư vấn du học',
  [ConsultationType.CAREER]: 'Tư vấn nghề nghiệp',
  [ConsultationType.FINANCE]: 'CTư vấn tài chính',
  [ConsultationType.HEALTH]: 'Tư vấn sức khỏe',
  [ConsultationType.LEGAL]: 'Tư vấn pháp lý',
};

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  [ReservationStatus.PENDING]: 'Chờ xử lý',
  [ReservationStatus.CONFIRMED]: 'Đã xác nhận',
  [ReservationStatus.CANCELLED]: 'Đã hủy',
};

export const STATUS_STYLES: Record<ReservationStatus, string> = {
  [ReservationStatus.PENDING]: 'bg-gray-500 text-white',
  [ReservationStatus.CONFIRMED]: 'bg-green-500 text-white',
  [ReservationStatus.CANCELLED]: 'bg-red-500 text-white',
};
