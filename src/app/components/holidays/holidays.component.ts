import { Component } from '@angular/core';
import { WorkdayCalculatorService } from '../../services/workday-calculator.service';
import { HolidayResponse } from '../../models/holiday';
import { EMPTY } from 'rxjs';
import {  MessageService } from 'primeng/api';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.css',
})
export class HolidaysComponent {
  isProcessing: boolean = false;  
  error!: string;
  holidays: HolidayResponse = { holidays: [] };
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
  ];
  constructor(
    private workdayCalculatorService: WorkdayCalculatorService,
    private messageService: MessageService,
  ) {}
  public ngOnInit(): void {
   
      this.getHolidays();
  }
  public getHolidays() {
    
    this.workdayCalculatorService.getHolidays().subscribe(
      (response: HolidayResponse) => {
        this.holidays = response;     
      },
      (error) => {
        this.whenError(error);
      }
    );
  }
  getMonthName(month: number): string {
    return this.monthNames[month - 1]; // Subtract 1 because the month array is 0-indexed
  }

 
  deleteHoliday(id: string) {
    this.isProcessing = true;
    this.workdayCalculatorService.deleteHoliday( id).subscribe({
      next: () => {
       this. getHolidays() 
        this.whenSuccess();
      },
      error: () => {
        this.whenError('This Client can not be deleted,Check whether it is in use.');
      },
    });
  }
  private whenError(error: string) {
    this.isProcessing = false;
    const errorDetail = error;
    const message = {
      severity: 'error',
      summary: 'Error',
      detail: errorDetail,
    };
    this.messageService.add(message);
    return EMPTY;
  }

  private whenSuccess(): void {
    this.isProcessing = false;
    const message = {
      severity: 'success',
      summary: 'Success',
      detail: 'Selected Client has been deleted.',
    };
    this.messageService.add(message);
  }

}
