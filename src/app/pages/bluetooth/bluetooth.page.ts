import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  // Import BehaviorSubject
import { BleClient } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  devicesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);  // Initialize as a BehaviorSubject
  deviceObject: any = null;  // Currently connected device
  IsScanning: boolean = false;
  status: string = "disconnected";

  constructor() {}

  ngOnInit() {
    this.scan();
  }

  // Start scanning for devices
  async scan(): Promise<void> {
    try {
      this.IsScanning = true;
      await BleClient.initialize();
      await BleClient.initialize({ androidNeverForLocation: true });
      await BleClient.requestLEScan(
        {},
        (result) => {
          console.log('Received new scan result', result);
          if (result.device) {
            // Avoid duplicates by checking if the device is already in the list
            const currentDevices = this.devicesSubject.value;
            if (!currentDevices.some(device => device.id === result.device)) {
              currentDevices.push(result.device);
              this.devicesSubject.next(currentDevices);  // Emit the updated list
            }
          }
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('Stopped scanning');
        this.IsScanning = false;
      }, 5000);
    } catch (error) {
      console.error('Error during scan', error);
      this.IsScanning = false;
    }
  }

  // Connect to the selected Bluetooth device
  async connect(deviceId: string): Promise<void> {
    try {
      const device = await BleClient.connect(deviceId);
      console.log('Connected to device', device);
      this.deviceObject = device;
      this.status = 'connected';
    } catch (error) {
      console.error('Failed to connect', error);
      this.status = 'disconnected';
    }
  }

  // Disconnect from the currently connected device
  async disconnect(): Promise<void> {
    if (this.deviceObject) {
      try {
        await BleClient.disconnect(this.deviceObject.deviceId);
        console.log('Disconnected from device');
        this.deviceObject = null;
        this.status = 'disconnected';
      } catch (error) {
        console.error('Failed to disconnect', error);
      }
    }
  }

  // Handle disconnection event
  onDisconnect(deviceId: string): void {
    console.log(`Device ${deviceId} disconnected`);
    this.status = 'disconnected';
    this.deviceObject = null;
  }
}
