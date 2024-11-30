import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Chart', url: 'graph', icon: 'stats-chart' },
    { title: 'Connection', url: 'wifi', icon: 'home' },
    { title: 'Setting', url: 'setting', icon: 'settings' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
