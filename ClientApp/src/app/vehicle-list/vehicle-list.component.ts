import { Vehicle, KeyValuePair } from './../models/vehicle';
import { VehicleService, IMake } from './../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  queryResult: any = {}
  makes: KeyValuePair[]
  query: any = { isSortAscending: false, pageSize: this.PAGE_SIZE}
  columns = [
    {title: 'Id'},
    {title: 'Make', key: 'make', isSortable: true},
    {title: 'Model', key: 'model', isSortable: true},
    {title: 'Contact Name', key: 'contactName', isSortable: true},
    {title: ''}
  ]

  constructor(private vehicleService: VehicleService) {   }

  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe(m => this.makes = m as KeyValuePair[]);

    this.populateVehicles();
  }

  onFilterChange(){
    this.query.page = 1;
    this.populateVehicles();
    /*var vehicles = this.allVehicles
    if(this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)
    this.vehicles = vehicles*/
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
    .subscribe(result => this.queryResult = result
    );
  }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    }
    this.onFilterChange();
  }

  sortBy(columnName: string) {
    if(this.query.sortBy === columnName)
      this.query.isSortAscending = !this.query.isSortAscending;
    else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page){
    this.query.page = page;
    this.populateVehicles();
  }
}
