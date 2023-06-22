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
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket= { 
    $key:'',
    reference : '',
    start : '' ,
    end : '' ,
    date:''
   }
   itemTicket : AngularFireList<any>
   ticketArray:any[] = []

   constructor(private db: AngularFireDatabase, public router: Router,private actRoute: ActivatedRoute ) {
    this.itemTicket = db.list('ticket')
     // return ticket ticket
     this.itemTicket.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.ticketArray.push(a as ListTicketClass);
      })
      //console.log(this.ticketArray);
    })//end
   
  }

  ngOnInit(): void {
  }
  EditForm($key: any){
    for( let value of this.ticketArray){
      if(value['$key'] == $key ){
        this.ticket.$key = $key;
        this.ticket.reference = value['reference'];
        this.ticket.start = value['start'] ;
        this.ticket.end = value['end'];
        this.ticket.date = value['date'];
      }
    }
  }
  OnEdit($key : any){
    this.ticket.reference 
    this.ticket.start 
    this.ticket.end
    this.ticket.date 

    this.itemTicket.set($key,{
      reference: this.ticket.reference,
      start: this.ticket.start,
      end: this.ticket.end,
      date: this.ticket.date,
    })
    this.ticketArray = []
  }
  onDelete($key: any){
    if (window.confirm('Are sure you want to delete this ticket?')){

      this.itemTicket.remove($key);
    }
    this.ticketArray = []
    this.router.navigate(['/tickets']);
  }

}
export interface ListTicketClass{
  $key: string ;
  start: string  ;
  end: string ;
  reference: string ;
  date: string ;
}