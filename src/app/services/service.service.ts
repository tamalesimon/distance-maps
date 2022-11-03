import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MapDirectionsService } from '@angular/google-maps';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public routesUrl: string = '/assets/saved-routes.json';
  allMyRoutes: any;
  address: any;
  markerPosition!: google.maps.MarkerOptions

  map!: google.maps.Map;
  markers!: google.maps.Marker[];
  request: google.maps.DirectionsRequest = {
    destination: {}, //
    origin: {}, //
    travelMode: google.maps.TravelMode.DRIVING
  }

 directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(private http: HttpClient, private mapDirectionsService: MapDirectionsService) {


   }

  login( username: string, password: string ) {
    console.log('is this being called')
    return this.http.post('login', {username, password});
  }

  getCurrentLocation() {
    return new Promise<any>((resolve, reject) => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          if(position){
            console.log(position)
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            let lat = position.coords.latitude;
            let long = position.coords.longitude;

            const currentLocation = {
              lat,
              long
            }
            resolve(currentLocation);
          }
        }, error => {
          console.error(error);
        })
      } else {
        reject('Geolocation is not supported by this browser');
      }
    })
  }

  getReverseGeocoding(lat:any, lng: any) {
    let latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results) {
          console.log(results[0].formatted_address);
          this.address = results[0].formatted_address;
        }
      }
    });
  }

  getSavedRoutes() {
    return this.http.get(this.routesUrl).pipe(
      map(response => response))
  }

  deleteSavedRoutes(id: any) {
    return this.http.delete(`{this.routesUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  createRoute(resource: any) {
    return this.http.post(this.routesUrl, JSON.stringify(resource)).pipe(
      map(response => response)
    )
  }

  saveMyRoute(geoValues: any){
    return this.http.post( this.routesUrl, JSON.stringify(geoValues)).pipe(
      map(response => response)
    )
  }

  calculateMyRoute(request: any) {
  //   const request: google.maps.DirectionsRequest = {
  //     destination: {
  //         lat: 0.31372692218433057,
  //         lng: 32.57945972606261
  //     },
  //     origin: {
  //         lat: 0.36219329074605283,
  //         lng: 32.60963286586434
  //     },
  //     travelMode: google.maps.TravelMode.DRIVING
  // };
  // this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result)
  // );

  return this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result))
  }

}

