import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Start', url: 'start', icon: 'home' },
    { title: 'Chart', url: 'graph', icon: 'stats-chart' },
    { title: 'Setting', url: 'setting', icon: 'settings' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
