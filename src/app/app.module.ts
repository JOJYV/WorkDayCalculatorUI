import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { WorkdayCalculatorComponent } from './components/workday-calculator/workday-calculator.component';

import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { CreateHolidayComponent } from './components/create-holiday/create-holiday.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkdayCalculatorComponent,
    HolidaysComponent,
    CreateHolidayComponent,
    
  
  ],
  imports: [RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RadioButtonModule,
    CheckboxModule,MenubarModule,MegaMenuModule,TableModule,MessagesModule,  // Ensure the MessagesModule is imported
    ButtonModule,
    RippleModule
     // Add RouterModule here
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
