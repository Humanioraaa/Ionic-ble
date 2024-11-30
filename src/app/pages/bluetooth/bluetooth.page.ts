import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-graph',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit{
  users: User[] = [];
  loader: any;

  constructor(
    private http: HttpClient,
    private loadCtrl: LoadingController
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  ionViewDidEnter(){
   this.fetchData();
  }

  // Fetch data from API
  fetchData() {

    this.loadCtrl.create({ message: 'Fetching..... '}).then(l => l.present());

    this.http.get("https://reqres.in/api/users?pages=2").subscribe((res: any) => {
      console.log(res);
      this.users = res.data;
      this.loadCtrl.dismiss();
    })

  }
}
