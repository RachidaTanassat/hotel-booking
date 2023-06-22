import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddClientComponent } from './add-client/add-client.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { environment } from '../environments/environment';
import { ListClientComponent } from './list-client/list-client.component';
import { TicketComponent } from './ticket/ticket.component';
import { HotelComponent } from './hotel/hotel.component';



const routes: Routes = [
  { path: '', redirectTo:'home' , pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'client', component: AddClientComponent },
  { path: 'tickets', component: TicketComponent },
  { path: 'hotel_booking', component: HotelComponent },
  { path: 'clientinfo/:$key', component: ListClientComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddClientComponent,
    ListClientComponent,
    TicketComponent,
    HotelComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
