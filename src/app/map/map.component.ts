import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  latitude: any;
  longitude: any;
  zoom: number = 13;
  center!:google.maps.LatLngLiteral
  markerPosition!: google.maps.MarkerOptions

  map!: google.maps.Map;
  markers!: google.maps.Marker[];
  formMaps!: FormGroup;
  selectedLocations: any;



 directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(public serviceService: ServiceService, mapDirectionsService: MapDirectionsService) {
    this.markers = [];

    this.formMaps = new FormGroup({
      origin: new FormControl(''),
      destination: new FormControl('')
    })
    const request: google.maps.DirectionsRequest = {
      destination: {
          lat: 0.31372692218433057,
          lng: 32.57945972606261
      },
      origin: {
          lat: 0.36219329074605283,
          lng: 32.60963286586434
      },
      travelMode: google.maps.TravelMode.DRIVING
  };
  this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result)
  );
  }

  ngAfterViewInit() {
    this.serviceService.getCurrentLocation().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.long;
      console.table(this.latitude, this.longitude)
      this.center = {lat:this.latitude, lng:this.longitude}
    });

  }

  onSubmit() {
    console.log('form value', );

  }

  handleAddressChange(address: Address) {
    console.table(address.formatted_address)
    console.table(address.geometry.location.lat())
    console.table(address.geometry.location.lng())
  }

}
