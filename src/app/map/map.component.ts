import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: any = 51.673858;
  longitude: any =7.815982;
  zoom: number = 8;

  constructor() { }

  ngOnInit(): void {
    // this.serviceService.getCurrentLocation().then((data) => {
    //   console.log(data);
    //   this.latitude = data.lat;
    //   this.longitude = data.long;
    // })

    console.table(this.latitude, this.longitude);
  }

}
