import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MapDirectionsService } from '@angular/google-maps';
import { NgxIndexedDBService  } from 'ngx-indexed-db';

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

  originFormattedAddress: any;
  originGeoLatitude!: number;
  originGeoLongitude!: number;
  id: any;
  destFormattedAddress: any;
  destGeoLatitude!: number;
  destGeoLongitude!: number;

  origin: any;
  destination: any;


 directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(private http: HttpClient, private mapDirectionsService: MapDirectionsService, private dbService: NgxIndexedDBService) {
    //
    this.dbService.getByKey('myRoutes', 1).subscribe((myRoutes) => {
      console.log(myRoutes);
    });
  //   this.dbService.bulkAdd('myRoutes',
  //   [
  //     {
  //         "origin": {
  //             "name": "Church House, 8H7H+9Q9, Kampala",
  //             "latitude": 0.31349477428844752,
  //             "longitude": 32.579427717401423
  //         },
  //         "destination": {
  //             "name": "Bethany Women's and Family Hospital, 16 Kabalega Close, Kampala",
  //             "latitude": 0.303281070519427,
  //             "longitude": 32.651268000949273
  //         }
  //     },
  //     {
  //         "origin": {
  //             "name": "Kungu Trading Center, Kungu Road, Kampala",
  //             "latitude": 0.39667859757188273,
  //             "longitude": 32.613654996489132
  //         },
  //         "destination": {
  //             "name": "The Harp Hamilton Park, Unnamed Road, Kampala",
  //             "latitude": 0.40088419935801711,
  //             "longitude": 32.652021312792471
  //         }
  //     }
  // ]
  //   ).subscribe(results => {
  //     console.log(results);
  //   })

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
    return this.dbService.getAll('myRoutes').pipe(
      map(response => response)
    )
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


  getSelected(route:any){
    return this.http.get(this.routesUrl).pipe(
      map(() => {
        console.log(route.destination.latitude)
        this.destGeoLatitude = route.destination.latitude;
        this.destGeoLongitude = route.destination.longitude;
        this.originGeoLatitude = route.origin.latitude;
        this.originGeoLongitude = route.origin.longitude;

        const request: google.maps.DirectionsRequest = {
          "destination": {
            lat:this.destGeoLatitude,
            lng:this.destGeoLongitude
          }, //
          "origin": {
            lat:this.originGeoLatitude,
            lng:this.originGeoLongitude
          }, //
          travelMode: google.maps.TravelMode.DRIVING
        }
          console.log("this is request: ",request)
        this.calculateMyRoute(request);
      }
      )
    )
  }

  calculateMyRoute(request: any) {
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result))
    return this.directionsResults$;
  }

}

export interface destination {
  lat: number,
  lng: number
}

