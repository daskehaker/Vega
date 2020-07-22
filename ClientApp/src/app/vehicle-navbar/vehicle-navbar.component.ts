import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vehicle-navbar',
  templateUrl: './vehicle-navbar.component.html'//,
  //styleUrls: ['./vehicle-navbar.component.css']
})
export class VehicleNavbarComponent implements OnInit {
  @Input('vehicle-id') id;  
  constructor() { }

  ngOnInit(): void {
  }

}
