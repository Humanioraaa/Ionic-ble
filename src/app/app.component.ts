import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Bluetooth', url: 'bluetooth', icon: 'bluetooth' },
    { title: 'Graph', url: 'graph', icon: 'stats-chart' },
    { title: 'Info', url: 'info', icon: 'information-circle' },
  ];
  constructor() {}
}
