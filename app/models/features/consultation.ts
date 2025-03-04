import type Reservation from "./reservation";

export default interface Consultation extends Reservation {
  consult_date: string;
}
