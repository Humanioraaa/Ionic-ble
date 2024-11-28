import { Component } from '@angular/core';
import { BluetoothLe } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {
  deviceInfo: any = null;

  async getDeviceInfo(deviceId: string) {
    const device = await BluetoothLe.connect({ deviceId });
    this.deviceInfo = device;
  }
}
