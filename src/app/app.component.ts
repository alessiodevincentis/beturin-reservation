import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'beturin-reservation';
  public rooms: any[] = [];

  public dataDa: any;
  public dataA: any;
  public adults = 0;
  public children = 0;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const url = window.location.href;
      if (url.includes('?')) {
        const httpParams = new HttpParams({ fromString: url.split('?')[1] });
        this.dataDa = httpParams.get('dataDa');
        this.dataA = httpParams.get('dataA');
        this.adults = + httpParams.get('adults')!;
        this.children = + httpParams.get('children')!;
      }
      console.log(this.dataDa + this.dataA + this.adults + this.children);
    });
    this.findRooms();
  }

  findRooms() {

    this.firestore.collection<any[]>('reservations').ref.where('dataFirsNight', '<=', this.dataDa)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data())
        })
      })
      .catch()
  }
}

    // .subscribe(data => {
      // this.rooms = data.map(e => {
      //   return {
      //     id: e.payload.doc.id,
      //     ...e.payload.doc.data()
      //   }
      // });
