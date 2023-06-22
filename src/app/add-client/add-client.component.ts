import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  data= { 
    $key : '',
   name : '' ,
   prenom : '' ,
   address : '' ,
   phone : ''
  }
itemList : AngularFireList<any>
itemList2 : AngularFireList<any>
itemArray:any[] = []
constructor(private db: AngularFireDatabase, public router: Router) {
  this.itemList = db.list('client')
  this.itemList2 = db.list('client')

  this.itemList2.snapshotChanges().subscribe(actions => {
    actions.forEach(action => {
      let a:any = action.payload.toJSON()
      a['$key'] = action.key
      this.itemArray.push(a as ListItemClass);
    })
  })
  console.log(this.itemArray)
  
}



  ngOnInit(){
  
  }
  insertClient(){
    this.itemList.push({
      nom: this.data.name,
      prenom: this.data.prenom,
      address: this.data.address,
      phone: this.data.phone,
    });
    this.itemArray = []
    // this.router.navigate(['home']);
  }


  EditForm($key: any){
    for( let value of this.itemArray){
      if(value['$key'] == $key ){
        this.data.$key = $key;
        this.data.name = value['nom'];
        this.data.prenom = value['prenom'] ;
        this.data.address = value['address'];
        this.data.phone = value['phone'];
      }
    }
  }
  OnEdit($key : any){
    this.data.name 
    this.data.prenom 
    this.data.address
    this.data.phone 

    this.itemList2.set($key,{
      nom: this.data.name,
      prenom: this.data.prenom,
      address: this.data.address,
      phone: this.data.phone,
    })
    this.itemArray = []
  }
  onDelete($key: any){
    if (window.confirm('Are sure you want to delete this client?')){

      this.itemList2.remove($key);
    }
    this.itemArray = []
  }







}
  export interface ListItemClass{
    $key: string ;
    name: string  ;
    prenom: string ;
    address: string ;
    phone: string ;
  }
  


