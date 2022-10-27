import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB_QzWnVLBQsDC1I46fX_6dcqlwgLSXJU4'
    }),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FakeBackendProvider, ServiceService, AuthServiceService, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
