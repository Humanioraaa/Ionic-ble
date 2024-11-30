import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bluetooth',
  templateUrl: 'bluetooth.page.html',
  styleUrls: ['bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {
  analogValue: number = 0;  // Variable to store the analog value

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchAnalogData();
  }

  fetchAnalogData() {
    this.apiService.getAnalogValue().subscribe(
      (response) => {
        console.log(response); // Log response for debugging
        this.analogValue = response.analogValue;  // Get the analog value from the response
      },
      (error) => {
        console.error('Error fetching data', error);  // Handle error
      }
    );
  }
}
