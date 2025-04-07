import {  Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Holiday } from '../../models/holiday';
import { MessageService } from 'primeng/api';
import { WorkdayCalculatorService } from '../../services/workday-calculator.service';

@Component({
  selector: 'app-create-holiday',
  templateUrl: './create-holiday.component.html',
  styleUrl: './create-holiday.component.css'
})
export class CreateHolidayComponent {

  holidayForm: FormGroup;
  isProcessing: boolean = false;
  submitted: boolean = false;
  @Output() holidayCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private workdayCalculatorService: WorkdayCalculatorService,
    private messageService: MessageService
  ) {
    this.holidayForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      month: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      day: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      year: [null],
      isRecurring: [false, Validators.required],
      isActive: [false, Validators.required]
    });
  }
  ngOnInit(): void {
    this.setupYearValidator();
  }
  setupYearValidator(): void {
    const isRecurringControl = this.holidayForm.get('isRecurring');
    const yearControl = this.holidayForm.get('year');
  
    isRecurringControl?.valueChanges.subscribe((isRecurring: boolean) => {
      if (isRecurring) {
        // Recurring holiday – year is not required
        yearControl?.setValidators([Validators.min(1), Validators.max(9999)]);
      } else {
        // Non-recurring holiday – year is required
        yearControl?.setValidators([Validators.required, Validators.min(1), Validators.max(9999)]);
      }
      yearControl?.updateValueAndValidity();
    });
  
    // Run initial validation based on current value
    const isRecurring = isRecurringControl?.value;
    if (isRecurring) {
      yearControl?.setValidators([Validators.min(1), Validators.max(9999)]);
    } else {
      yearControl?.setValidators([Validators.required, Validators.min(1), Validators.max(9999)]);
    }
    yearControl?.updateValueAndValidity();
  }

  // Getter for easy access to form fields
  get f() {
    return this.holidayForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.holidayForm.invalid) {
      return;
    }

    this.isProcessing = true;

    const holiday: Holiday = this.holidayForm.value;

      this.workdayCalculatorService.saveHoliday( holiday).subscribe({
        next: () => {
          this.whenSuccess();
        },
        error: () => {
          this.whenError('This Client can not be deleted,Check whether it is in use.');
        },
      });
    
  }

  private whenSuccess(): void {
    this.isProcessing = false;
    this.holidayCreated.emit();
    const message = {
      severity: 'success',
      summary: 'Success',
      detail: 'Holiday saved successfully.'
    };
    this.messageService.add(message);
    this.holidayForm.reset();  // Optionally reset the form
  }

  private whenError(error: any): void {
    this.isProcessing = false;
    const message = {
      severity: 'error',
      summary: 'Error',
      detail: 'Error saving holiday.'
    };
    this.messageService.add(message);
  }
}
