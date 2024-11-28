import { Component } from '@angular/core';
import { BluetoothLe } from '@capacitor-community/bluetooth-le';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage {
  device: any = null;
  isConnected = false;
  ecgData: number[] = [];

  constructor(private navCtrl: NavController) {}

  async scanForDevices() {
    try {
      const result = await BluetoothLe.requestDevice({
        services: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'],
        optionalServices: ['beb5483e-36e1-4688-b7f5-ea07361b26a8'],
      });
      this.device = result;
      console.log('Device found:', this.device);
      this.connectToDevice();
    } catch (error) {
      console.error('Error scanning for devices:', error);
    }
  }

  async connectToDevice() {
    if (!this.device) return;
    try {
      await BluetoothLe.connect({ deviceId: this.device.deviceId });
      console.log('Connected to device');
      this.isConnected = true;
      this.startNotifications();
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  }

  async startNotifications() {
    try {
      await BluetoothLe.startNotifications({
        characteristic: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
        service: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
        deviceId: this.device.deviceId,
      });

      BluetoothLe.addListener('deviceNotification', (notification: any) => {
        const ecgSignal = new DataView(new ArrayBuffer(4));
        for (let i = 0; i < 4; i++) {
          ecgSignal.setUint8(i, notification.value.charCodeAt(i));
        }
        this.ecgData.push(ecgSignal.getInt32(0, true));
        if (this.ecgData.length > 100) {
          this.ecgData.shift(); // Limit the data array length
        }
      });
    } catch (error) {
      console.error('Error starting notifications:', error);
    }
  }

  disconnect() {
    BluetoothLe.disconnect({ deviceId: this.device.deviceId });
    this.isConnected = false;
    console.log('Disconnected from device');
  }

  navigateToGraph() {
    this.navCtrl.navigateForward('/graph', {
      queryParams: { data: JSON.stringify(this.ecgData) },
    });
  }
}
