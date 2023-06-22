import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotelbooking= { 
    $key: '',
    reference : '',
    num_chamber : '' ,
    date_start : '' ,
    date_end : '' ,
    num_nuit : '',
    type : '',
    smoking : '' 
  }

  itemHotel : AngularFireList<any>
  HotelArray:any[] = []

   constructor(private db: AngularFireDatabase, public router: Router,private actRoute: ActivatedRoute ) {
    this.itemHotel = db.list('hotelbooking')
     // return ticket ticket
     this.itemHotel.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.HotelArray.push(a as ListHotelClass);
      })
      //console.log(this.ticketArray);
    })//end
   
  }

  ngOnInit(): void {
  }
  EditForm($key: any){
    for( let value of this.HotelArray){
      if(value['$key'] == $key ){
        this.hotelbooking.$key = $key;
        this.hotelbooking.num_chamber = value['num_chamber'] ;
        this.hotelbooking.date_start = value['date_start'];
        this.hotelbooking.reference = value['reference'];
        this.hotelbooking.date_end = value['date_end'];
        this.hotelbooking.num_nuit = value['num_nuit'];
        this.hotelbooking.type = value['type'];
        this.hotelbooking.smoking = value['smoking'];
      }
    }
  }
  OnEdit($key : any){
    this.hotelbooking.num_chamber 
    this.hotelbooking.date_start 
    this.hotelbooking.reference
    this.hotelbooking.date_end 
    this.hotelbooking.num_nuit
    this.hotelbooking.type
    this.hotelbooking.smoking  

    this.itemHotel.set($key,{
      num_chamber: this.hotelbooking.num_chamber,
      date_start: this.hotelbooking.date_start,
      reference: this.hotelbooking.reference,
      date_end: this.hotelbooking.date_end,
      num_nuit: this.hotelbooking.num_nuit,
      type: this.hotelbooking.type,
      smoking: this.hotelbooking.smoking,
    })
    this.HotelArray = []
  }
  onDelete($key: any){
    if (window.confirm('Are sure you want to delete this reservation?')){

      this.itemHotel.remove($key);
    }
    this.HotelArray = []
  }

}
export interface ListHotelClass{
  $key: string ;
  num_chamber: string  ;
  date_start: string ;
  reference: string ;
  date_end: string ;
  num_nuit: string  ;
  type: string ;
  smoking: string ;
}