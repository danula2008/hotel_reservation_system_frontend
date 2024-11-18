export class Customer {
    id: string | null;
    gender: string;
    dob: Date | null;
    contact: string;
    country: string;
    userId: string | null;
    lname: string;
    fname: string;
  
    constructor(
      id: string | null,
      gender: string,
      dob: Date | null,
      contact: string,
      country: string,
      userId: string  | null,
      lname: string,
      fname: string
    ) {
      this.id = id;
      this.gender = gender;
      this.dob = dob;
      this.contact = contact;
      this.country = country;
      this.userId = userId;
      this.lname = lname;
      this.fname = fname;
    }
  }
  