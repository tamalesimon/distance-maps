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

}

