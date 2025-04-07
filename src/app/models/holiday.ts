// holiday.model.ts

export class Holiday {
     id!: number;
    name!: string;
    month!: number;
    day!: number;
    year!: number | null;
    isRecurring: boolean = false;
    isActive: boolean = false;
  }
  
  export class HolidayResponse {
    holidays: Holiday[] = [];
    
  }
  