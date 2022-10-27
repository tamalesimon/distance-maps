import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  login( username: string, password: string ) {
    console.log('is this being called')
    return this.http.post('login', {username, password});
  }

  // getCurrentLocation() {
  //   return new Promise<any>((resolve, reject) => {
  //     if(navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         if(position){
  //           console.log(
  //             'Latitude: ' +
  //               position.coords.latitude +
  //               'Longitude: ' +
  //               position.coords.longitude
  //           );
  //           let lat = position.coords.latitude;
  //           let long = position.coords.longitude;

  //           const currentLocation = {
  //             lat,
  //             long
  //           }
  //           resolve(currentLocation);
  //         }
  //       }, error => {
  //         console.error(error);
  //       })
  //     } else {
  //       reject('Geolocation is not supported by this browser');
  //     }
  //   })
  // }


}

