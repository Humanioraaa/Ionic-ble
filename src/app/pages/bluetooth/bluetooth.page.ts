import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BleClient } from '@capacitor-community/bluetooth-le';
// import iro from '@jaames/iro'; // Assuming you have iro.js imported

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage {

  deviceObject: any;
  ledToggle: number = 0;
  rValue: number = 255;
  gValue: number = 255;
  bValue: number = 255;
  IsScanning:boolean = false;

  constructor() {
    this.setupEventListeners();
  }

  // Function to initialize and start scanning for devices
  async scan(): Promise<void> {
    try {
      await BleClient.initialize();
      await BleClient.initialize({ androidNeverForLocation: true });
      await BleClient.requestLEScan(
        {
          // services: [HEART_RATE_SERVICE], // Uncomment and specify the service if needed
        },
        (result) => {
          console.log('Received new scan result', result);
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('Stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to connect to a Bluetooth device
  async connect(): Promise<void> {
    try {
      await BleClient.initialize();

      const device = await BleClient.requestDevice({
        // Specify filters or options here if needed
      });

      await BleClient.connect(device.deviceId, (deviceId) => this.onDisconnect(deviceId));
      console.log('Connected to device', device);
      this.deviceObject = device;

    } catch (error) {
      console.error(error);
    }
  }

  // Function to start listening for notifications from the device
  // async startListen(): Promise<void> {
  //   if (this.deviceObject) {
  //     const char1Value = document.getElementById('char1');
  //     await BleClient.startNotifications(
  //       this.deviceObject.deviceId,
  //       "4fafc201-1fb5-459e-8fcc-c5c9c331914b", // Service UUID
  //       "beb5483e-36e1-4688-b7f5-ea07361b26a8", // Characteristic UUID
  //       (value) => {
  //         console.log('Character data received: ', value.getUint32(0, true));
  //         if (char1Value) {
  //           char1Value.innerHTML = value.getUint32(0, true).toString();
  //         }
  //       }
  //     );
  //   }
  // }

  // Function to write data (toggle LED and color values)
  // async writeData(ledToggle: number, rValue: number, gValue: number, bValue: number): Promise<void> {
  //   const bufferSize = 20;
  //   const buffer = new ArrayBuffer(bufferSize);
  //   const dataView = new DataView(buffer);

  //   dataView.setUint8(0, ledToggle);
  //   dataView.setUint8(1, rValue);
  //   dataView.setUint8(2, gValue);
  //   dataView.setUint8(3, bValue);

  //   if (this.deviceObject) {
  //     await BleClient.write(
  //       this.deviceObject.deviceId,
  //       "4fafc201-1fb5-459e-8fcc-c5c9c331914b", // Service UUID
  //       "e3223119-9445-4e96-a4a1-85358c4046a2", // Characteristic UUID
  //       dataView
  //     );
  //   }
  // }

  // Set up event listeners for buttons and slider
  setupEventListeners(): void {
    // const button1 = document.getElementById("button1");
    // if (button1) {
    //   button1.addEventListener('click', () => {
    //     this.connect();
    //     console.log("Connect button pressed");
    //   });
    // }

    // const button2 = document.getElementById("button2");
    // if (button2) {
    //   button2.addEventListener('click', () => {
    //     this.startListen();
    //     console.log("Start listen button pressed");
    //   });
    // }

    // const button3 = document.getElementById("button3");
    // if (button3) {
    //   button3.addEventListener('click', () => {
    //     this.ledToggle = this.ledToggle === 0 ? 1 : 0;
    //     console.log("LED toggle", this.ledToggle);
    //     this.writeData(this.ledToggle, this.rValue, this.gValue, this.bValue);
    //   });
    // }

    // // Set up color picker (IRO.js)
    // const colorPicker = new iro.ColorPicker('#picker');
    // const rValueDom = document.getElementById("r-value");
    // const gValueDom = document.getElementById("g-value");
    // const bValueDom = document.getElementById("b-value");

    // colorPicker.on('color:change', (color) => {
    //   console.log("r: ", color.rgb.r, " g: ", color.rgb.g, " b: ", color.rgb.b);
    //   this.rValue = color.rgb.r;
    //   this.gValue = color.rgb.g;
    //   this.bValue = color.rgb.b;
    //   if (rValueDom) rValueDom.innerHTML = this.rValue.toString();
    //   if (gValueDom) gValueDom.innerHTML = this.gValue.toString();
    //   if (bValueDom) bValueDom.innerHTML = this.bValue.toString();
    //   this.writeData(this.ledToggle, this.rValue, this.gValue, this.bValue);
    // });

    // // Set up slider
    // const slider1 = document.getElementById("slider1") as HTMLInputElement;
    // const slider1Reading = document.getElementById("slider1-reading");

    // if (slider1 && slider1Reading) {
    //   slider1Reading.innerHTML = slider1.value;

    //   slider1.addEventListener('input', () => {
    //     slider1Reading.innerHTML = slider1.value;
    //     const sliderValue = parseInt(slider1.value, 10);
    //     this.writeData(sliderValue, this.rValue, this.gValue, this.bValue);
    //   });
    // }
  }

  // Function to handle device disconnection
  onDisconnect(deviceId: string): void {
    console.log(`Device ${deviceId} disconnected`);
  }
}
