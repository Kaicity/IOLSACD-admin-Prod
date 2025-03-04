import type Reservation from "./reservation";

export default interface Contact extends Reservation {
  address: string;
  email: string;
  subject: string;
  file: File;
}
