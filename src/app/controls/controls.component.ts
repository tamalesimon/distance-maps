import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapDirectionsService } from '@angular/google-maps';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { find } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  latitudes: any;
  longitude: any;
  formValues!: FormGroup;
  address: any;
  allSavedRoutes: any[] = [];
  myRoutes: any[] = [];

  originFormattedAddress: any;
  originGeoLatitude: any;
  originGeoLongitude: any;
  id: any;
  destFormattedAddress: any;
  destGeoLatitude: any;
  destGeoLongitude: any;

  origin: any;
  destination: any;

  @Input('isOpen') isOpen = true;
  @Output() change = new EventEmitter();

  @Output() formChange = new EventEmitter<any>();

  constructor(private serviceService: ServiceService) {
    this.formValues = new FormGroup({
      origin: new FormControl(''),
      destination: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.serviceService.getSavedRoutes().subscribe({
      next: (myRoutes) => {
        this.myRoutes = myRoutes as any;
        console.log('my routes', myRoutes);
      },
    });
  }

  ngAfterViewInit() {
    this.serviceService
      .getCurrentLocation()
      .then((geoInfo) => {
        const result = {
          lat: geoInfo.lat,
          lng: geoInfo.long,
        };
        return result;
      })
      .then((result) => {
        this.serviceService.getReverseGeocoding(result.lat, result.lng);
        this.latitudes = result.lat;
        this.longitude = result.lng;
        this.address = this.serviceService.address;
      });
  }

  onClickIsOpen(): void {
    this.isOpen = !this.isOpen;
    this.change.emit({ isOpen: this.isOpen });
  }

  calculateRoute(values: any) {
    this.formChange.emit(values);
  }

  handleOriginChange(address: Address) {
    this.originFormattedAddress = address.formatted_address;
    this.originGeoLatitude = address.geometry.location.lat();
    this.originGeoLongitude = address.geometry.location.lng();
  }
  handleDestinationChange(address: Address) {
    this.destFormattedAddress = address.formatted_address;
    this.destGeoLatitude = address.geometry.location.lat();
    this.destGeoLongitude = address.geometry.location.lng();
  }

  update(id:any) {

    this.serviceService.updateRoute(id).subscribe();
  }

  saveRoute() {
    let result = ({
      origin: {
        name: this.originFormattedAddress,
        latitude: this.originGeoLatitude,
        longitude: this.originGeoLongitude,
      },
      destination: {
        name: this.destFormattedAddress,
        latitude: this.destGeoLatitude,
        longitude: this.destGeoLongitude,
      },
    });
    this.myRoutes.push(result);
    console.log('saving route', result);
    this.serviceService.saveMyRoute(result);
  }

  calRoute() {
    const request: google.maps.DirectionsRequest = {
      destination: {
        lat: this.destGeoLatitude,
        lng: this.destGeoLongitude,
      }, //
      origin: {
        lat: this.originGeoLatitude,
        lng: this.originGeoLongitude,
      }, //
      travelMode: google.maps.TravelMode.DRIVING,
    };
    console.log('Request for cal: ', request);
    return this.serviceService.calculateMyRoute(request);
  }

  deleteRoute(myRoute: any) {
    let index = this.myRoutes.indexOf(myRoute);
    this.myRoutes.splice(index, 1);
    console.log(myRoute);

    this.serviceService.deleteRoute(myRoute.id).subscribe({
      next: () => {},
    });
  }

  selectSaveRoute(id: any) {
    this.serviceService.getSelected(id).subscribe();
  }
}

export interface IsOpenChangedEvenArgs {
  isOpen: boolean;
}
