import { Vehicle, KeyValuePair } from './../models/vehicle';
import { VehicleService, IMake } from './../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[]
  makes: KeyValuePair[]
  query: any = {}

  constructor(private vehicleService: VehicleService) {   }

  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe(m => this.makes = m as KeyValuePair[]);

    this.populateVehicles();
  }

  onFilterChange(){
    this.populateVehicles();
    /*var vehicles = this.allVehicles
    if(this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)
    this.vehicles = vehicles*/
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
    .subscribe(vehicles => this.vehicles = vehicles as Vehicle[]);
  }

  resetFilter(){
    this.query = {}
    this.onFilterChange();
  }

  sortBy(columnName: string) {
    if(this.query.sortBy === columnName)
      this.query.isSortAscending = false;
    else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }
}
