import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Bluetooth', url: 'bluetooth', icon: 'bluetooth' },
    { title: 'Graph', url: 'graph', icon: 'paper-plane' },
    { title: 'Info', url: 'info', icon: 'heart' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
