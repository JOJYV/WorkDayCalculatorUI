import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkdayCalculatorService } from '../../services/workday-calculator.service';
import { HolidaysComponent } from '../holidays/holidays.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-workday-calculator',
  templateUrl: './workday-calculator.component.html',
  styleUrls: ['./workday-calculator.component.css']
})
export class WorkdayCalculatorComponent {
  workdayForm: FormGroup;
  resultDate: Date | null = null;

  @ViewChild(HolidaysComponent) holidaysComponent!: HolidaysComponent;

  constructor(
    private fb: FormBuilder,
    private workdayCalculatorService: WorkdayCalculatorService
  ) {
    this.workdayForm = this.fb.group({
      startDate: [null, Validators.required],
      workingDays: [null, Validators.required],
      workStartHour: ['08:00', [Validators.required, Validators.pattern('^([0-1][0-9]|2[0-3]):([0-5][0-9])$')]],
      workEndHour: ['16:00', [Validators.required, Validators.pattern('^([0-1][0-9]|2[0-3]):([0-5][0-9])$')]]
    });
  }

  onHolidayCreated() {
    this.holidaysComponent.getHolidays();
  }

  calculateWorkday() {
    if (this.workdayForm.valid) {
      const formValue = this.workdayForm.value;
  
      const originalDate: Date = formValue.startDate;
  
      // Format to 'yyyy-MM-ddTHH:mm:ss' in local time (Norway)
      const formattedStartDate = formatDate(originalDate, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
  
      const requestPayload = {
        ...formValue,
        startDate: formattedStartDate
      };
  
      this.workdayCalculatorService.calculateWorkday(requestPayload).subscribe(
        response => {
          this.resultDate = response.resultDate;
        },
        error => {
          console.error('Error calculating workday:', error);
        }
      );
    }
  }
}
