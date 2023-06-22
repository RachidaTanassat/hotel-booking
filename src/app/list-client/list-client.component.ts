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
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  data= { 
    $key : '',
   name : '' ,
   prenom : '' ,
   address : '' ,
   phone : ''
  }
  ticket= { 
   reference : '',
   start : '' ,
   end : '' ,
   date:''
  }
  hotelbooking= { 
    reference : '',
    num_chamber : '' ,
    date_start : '' ,
    date_end : '' ,
    num_nuit : '',
    type : '',
    smoking : '' 
  }
  

  
  itemList : AngularFireList<any>
  itemTicket : AngularFireList<any>
  itemHotel : AngularFireList<any>

  itemArray:any[] = []
  ticketArray:any[] = []
  HotelArray:any[] = []
  id:any 
  
  constructor(private db: AngularFireDatabase, public router: Router,private actRoute: ActivatedRoute ) {
    this.itemList = db.list('client')
    this.itemTicket = db.list('ticket')
    this.itemHotel = db.list('hotelbooking')

    // return data client
    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.itemArray.push(a as ListItemClass);
      })
    })//end
     // return data ticket
     this.itemTicket.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.ticketArray.push(a as ListTicketClass);
      })
      //console.log(this.ticketArray);
    })//end
    // return data hotelBooking
    this.itemHotel.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.HotelArray.push(a as ListHotelClass);
      })
      //console.log(this.ticketArray);
    })//end




    this.id = this.actRoute.snapshot.paramMap.get('$key');
  }

  ngOnInit() {
    
  }
  insertTicket(){
    this.itemTicket.push({
      reference: this.id,
      start: this.ticket.start,
      end: this.ticket.end,
      date: this.ticket.date,
    });
    this.ticketArray = []
  }
  insertResev(){
    this.itemHotel.push({
      reference: this.id,
      num_chamber: this.hotelbooking.num_chamber,
      date_start : this.hotelbooking.date_start,
      date_end : this.hotelbooking.date_end,
      num_nuit : this.hotelbooking.num_nuit,
      type : this.hotelbooking.type,
      smoking : this.hotelbooking.smoking,
    });
    this.HotelArray = []
  }
  
 

}
export interface ListItemClass{
  $key: string ;
  name: string  ;
  prenom: string ;
  address: string ;
  phone: string ;
}
export interface ListTicketClass{
  $key: string ;
  start: string  ;
  end: string ;
  reference: string ;
  date: string ;
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

