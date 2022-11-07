import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {  MatCheckboxModule} from '@angular/material/checkbox';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FakeBackendProvider } from './utils/fake-backend';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './services/service.service';
import { AuthServiceService } from './services/auth-service.service';
import { ControlsComponent } from './controls/controls.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbconfig: DBConfig = {
  name: 'MyRoutesDB',
  version: 1,
  objectStoresMeta: [{
    store: 'myRoutes',
    storeConfig: {keyPath:'id', autoIncrement: true},
    storeSchema: [
      {name: 'origin', keypath:'origin', options: {unique:false}},
      {name: 'destination', keypath:'destination', options: {unique:false}},
      {name: 'name', keypath:'name', options: {unique:false}},
      {name: 'lat', keypath:'lat', options: {unique:false}},
      {name: 'lng', keypath:'lng', options: {unique:false}},
    ]
  }]
}
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    GooglePlaceModule,
    NgxIndexedDBModule.forRoot(dbconfig)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FakeBackendProvider, ServiceService, AuthServiceService, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
