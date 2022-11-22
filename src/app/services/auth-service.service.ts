import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private serviceService: ServiceService) {
    const token = localStorage.getItem('map_auth_token')
    this._isLoggedIn.next(!token);
  }

  login(username: string, password: string) {
    return this.serviceService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem('map_auth_token', response.token);
      })
    );
  }
}
