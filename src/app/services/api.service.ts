import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://192.168.4.1';  // ESP32 IP address when in AP mode

  constructor(private http: HttpClient) {}

  getAnalogValue(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tes`); // Get request to /tes
  }
}
