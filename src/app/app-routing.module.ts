import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/wifi',
    pathMatch: 'full'
  },
  {
    path: 'wifi',
    loadChildren: () => import('./pages/bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
  },
  {
    path: 'graph',
    loadChildren: () => import('./pages/graph/graph.module').then( m => m.GraphPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
