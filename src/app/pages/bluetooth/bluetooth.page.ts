import { Component, OnInit } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  deviceObject: any;
  ledToggle: number = 0;
  rValue: number = 255;
  gValue: number = 255;
  bValue: number = 255;
  IsScanning: boolean = false;
  scannedDevices: any[] = []; // To hold the list of scanned devices

  constructor() {}

  ngOnInit() {}

  // Function to initialize and start scanning for devices
  async scan(): Promise<void> {
    try {
      // Set scanning flag to true
      this.IsScanning = true;
      this.scannedDevices = []; // Reset previous scan results

      await BleClient.initialize();
      await BleClient.initialize({ androidNeverForLocation: true });

      // Start scanning for Bluetooth LE devices
      await BleClient.requestLEScan(
        {},
        (result) => {
          console.log('Received new scan result', result);
          // Add scanned device to the array
          if (result.device) {
            this.scannedDevices.push(result.device);
          }
        }
      );

      // Stop scanning after 5 seconds
      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('Stopped scanning');
        this.IsScanning = false; // Set scanning flag to false
      }, 5000);

    } catch (error) {
      console.error(error);
      this.IsScanning = false; // In case of error, stop scanning
    }
  }

  // Function to connect to a Bluetooth device
  async connect(deviceId: string): Promise<void> {
    try {
      await BleClient.initialize();

      const device = await BleClient.requestDevice({
        name: deviceId ,
      });

      await BleClient.connect(device.deviceId, (deviceId) => this.onDisconnect(deviceId));
      console.log('Connected to device', device);
      this.deviceObject = device;

    } catch (error) {
      console.error(error);
    }
  }

  // Function to handle device disconnection
  onDisconnect(deviceId: string): void {
    console.log(`Device ${deviceId} disconnected`);
  }
}
