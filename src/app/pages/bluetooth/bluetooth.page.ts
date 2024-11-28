import { Component } from '@angular/core';
import { Route } from '@angular/router';
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
  bluetoothIsScanning = false;
  ecgData: number[] = [];

  bluetoothScanResults: ScanResult[] = [];
  bluetoothConnectedDevice?: ScanResult;


  readonly serviceArduino =
  '4fafc201-1fb5-459e-8fcc-c5c9c331914b'.toUpperCase();

  constructor(private navCtrl: NavController, public router: Route) {};

  async scanForBluetoothDevices() {
    try {
      await BluetoothLe.initialize();

      this.bluetoothScanResults = [];
      this.bluetoothIsScanning = true;

      // passing goProControlAndQueryServiceUUID will show only GoPro devices
      // read more here https://github.com/gopro/OpenGoPro/discussions/41#discussion-3530421
      // but if you pass empty array to services it will show all nearby bluetooth devices
      await BluetoothLe.requestLEScan(
        { services: [this.serviceArduino] },
        this.onBluetoothDeviceFound.bind(this)
      );

      const stopScanAfterMilliSeconds = 3500;
      setTimeout(async () => {
        await BleClient.stopLEScan();
        this.bluetoothIsScanning = false;
        console.log('stopped scanning');
      }, stopScanAfterMilliSeconds);
    } catch (error) {
      this.bluetoothIsScanning = false;
      console.error('scanForBluetoothDevices', error);
    }
  }

  onBluetoothDeviceFound(result) {
    console.log('received new scan result', result);
    this.bluetoothScanResults.push(result);
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
