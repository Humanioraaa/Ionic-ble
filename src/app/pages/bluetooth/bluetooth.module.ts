import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BluetoothPageRoutingModule } from './bluetooth-routing.module';

import { BluetoothPage} from './bluetooth.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluetoothPageRoutingModule
  ],
  declarations: [BluetoothPage],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BluetoothPageModule {}
