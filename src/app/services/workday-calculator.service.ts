import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolidayResponse } from '../models/holiday';

@Injectable({
  providedIn: 'root'
})
export class WorkdayCalculatorService {
  private readonly baseUrl = 'https://localhost:7252/api/v1';

  constructor(private http: HttpClient) {}

  calculateWorkday(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/WorkdayCalculate/calculate-date`, request);
  }

  getHolidays(): Observable<HolidayResponse> {
    return this.http.get<HolidayResponse>(`${this.baseUrl}/Holiday/all?pageNumber=1&pageSize=100`, {
      headers: { 'accept': '*/*' }
    });
  }

  deleteHoliday(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Holiday/${id}`, {
      headers: { 'accept': '*/*' }
    });
  }

  saveHoliday(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Holiday`, request);
  }
}
