import * as _ from 'underscore';
import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleInfo } from './../models/vehicle'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  vehicle: VehicleInfo = {
    make: "",
    model: "",
    isRegistered: false,
    features: null,
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  }
  id: number;

  constructor(private vehicleService: VehicleService,
    route:ActivatedRoute, router: Router) {
      route.params.subscribe(p => {
      this.id = +p['id']
      if(isNaN(this.id) || this.id <= 0)
        router.navigate(['/vehicles']);
        return;
    });
      this.vehicleService.getVehicle(this.id).subscribe(v => this.setVehicle(v as Vehicle))
  }

  setVehicle(v: Vehicle){
    this.vehicle.make = v.make.name;
    this.vehicle.model = v.model.name;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.features = _.pluck(v.features, 'name');
    this.vehicle.contactName = v.contact.name;
    this.vehicle.contactEmail = v.contact.email;
    this.vehicle.contactPhone = v.contact.phone;
  }

  ngOnInit(): void {
  }

}
