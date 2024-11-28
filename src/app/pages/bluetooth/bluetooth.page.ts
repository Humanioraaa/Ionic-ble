import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BleClient,
  ScanResult,
} from '@capacitor-community/bluetooth-le';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {
  devices:any[]=[]
  ble:boolean=false
  bluetoothScanResults: ScanResult[] = [];
  bluetoothIsScanning = false;
  deviceObject=this.devices;

  bluetoothConnectedDevice?: ScanResult;

  readonly serviceBleAerduino =
    '4fafc201-1fb5-459e-8fcc-c5c9c331914b'.toUpperCase();

  constructor(public toastController: ToastController, public router: Router) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {

  }

  toggleBle(event: any){
    if(this.ble){
      this.enableBluetooth();
    } else {
      this.disableBluetooth();
    }
  }

  enableBluetooth(){
    BleClient.enable();
  }

  disableBluetooth(){
    BleClient.disable();
  }

  async scan() {
    try {
      await BleClient.initialize();
      await BleClient.initialize({ androidNeverForLocation: true });
      await BleClient.requestLEScan(
        {
          //services: [HEART_RATE_SERVICE],
        },
        (result) => {
          console.log('received new scan result', result);
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  async scanForBluetoothDevices() {
    try {
      // Initialize the Bluetooth client
      await BleClient.initialize();
      BleClient.isEnabled();

      this.bluetoothScanResults = [];
      this.bluetoothIsScanning = true;

      await BleClient.requestLEScan(
        { services: [this.serviceBleAerduino] },
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
      this.presentToast('Failed to scan: ' + JSON.stringify(error));
    }
  }

  onBluetoothDeviceFound(result: ScanResult) {
    console.log('received new scan result', result);
    this.bluetoothScanResults.push(result);
  }

  async connectToBluetoothDevice(scanResult: ScanResult) {
    const device = scanResult.device;

    try {
      await BleClient.connect(device.deviceId, this.onBluetooDeviceDisconnected.bind(this));

      this.bluetoothConnectedDevice = scanResult;

      const deviceName = device.name ?? device.deviceId;
      this.presentToast(`Connected to device: ${deviceName}`);
    } catch (error) {
      console.error('connectToDevice', error);
      this.presentToast('Connection error: ' + JSON.stringify(error));
    }
  }

  async disconnectFromBluetoothDevice(scanResult: ScanResult) {
    const device = scanResult.device;
    try {
      await BleClient.disconnect(scanResult.device.deviceId);
      const deviceName = device.name ?? device.deviceId;
      this.presentToast(`Disconnected from device: ${deviceName}`);
    } catch (error) {
      console.error('disconnectFromDevice', error);
      this.presentToast('Disconnection error: ' + JSON.stringify(error));
    }
  }

  onBluetooDeviceDisconnected(disconnectedDeviceId: string) {
    this.presentToast(`Disconnected from ${disconnectedDeviceId}`);
    this.bluetoothConnectedDevice = undefined;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
