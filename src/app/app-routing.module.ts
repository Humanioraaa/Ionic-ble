import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'folder/Inbox',
//     pathMatch: 'full'
//   },
//   {
//     path: 'folder/:id',
//     loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
//   },
//   {
//     path: 'bluetooth',
//     loadChildren: () => import('./pages/bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
//   },
//   {
//     path: 'graph',
//     loadChildren: () => import('./pages/graph/graph.module').then( m => m.GraphPageModule)
//   },
//   {
//     path: 'info',
//     loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
//   },
//   {
//     path: 'setting',
//     loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
//   }

// ];

const routes: Routes = [
  { path: '', redirectTo: 'bluetooth', pathMatch: 'full' },
  { path: 'bluetooth', loadChildren: () => import('./pages/bluetooth/bluetooth.module').then(m => m.BluetoothPageModule) },
  { path: 'graph', loadChildren: () => import('./pages/graph/graph.module').then(m => m.GraphPageModule) },
  { path: 'info', loadChildren: () => import('./pages/info/info.module').then(m => m.InfoPageModule) },  {
    path: 'bluetooth',
    loadChildren: () => import('./pages/bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
