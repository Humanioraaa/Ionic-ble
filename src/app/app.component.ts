// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {

//   constructor() {}
// }


import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  // This variable will be used to check if the device is mobile
  isMobile: boolean = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    // Check the platform and set isMobile accordingly
    this.platform.ready().then(() => {
      this.isMobile = this.platform.is('mobile') || this.platform.is('tablet');
    });
  }

  toggleMenu() {
    // Toggle menu when the button is clicked
    const menu = document.querySelector('ion-menu');
    menu?.toggle();
  }

  public appPages = [
    { title: 'Bluetooth', url: 'bluetooth', icon: 'bluetooth' },
    { title: 'Graph', url: 'graph', icon: 'stats-chart' },
    { title: 'Info', url: 'info', icon: 'information-circle' },
  ];

}
