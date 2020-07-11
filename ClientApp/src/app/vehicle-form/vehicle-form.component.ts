import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService, IMake, IModel, IVehicle, IFeature } from '../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle-form.component.html',
})
export class VehicleFormComponent implements OnInit {
  makes: any[];//IMake[];
  models: any[];//IModel[];
  vehicle: SaveVehicle = {
    id: 0,
    modelId: 0, 
    makeId: 0, 
    isRegistered: false,
    features: [], 
    contact: {
    name: "",
    phone: "",
    email: ""
  }};
  features: {}//any[];// IFeature[];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private vehicleService: VehicleService, 
      private toastrService: ToastrService)
      {
        route.params.subscribe(p => {
          this.vehicle.id = +p['id'];
        });
      }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))
    
    forkJoin(sources).subscribe(data => {
      this.makes = data[0] as IMake[];
      this.features = data[1];
      if (this.vehicle.id){
        this.setVehicle(data[2] as Vehicle);      
        this.populateModels();
      }
    }, err => {
      if(err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private setVehicle(v: Vehicle){
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }
  
  private populateModels(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event){
    if ($event.target.checked){
      this.vehicle.features.push(featureId);
    }
    else{
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit(){
    if(this.vehicle.id){
      this.vehicleService.updateVehicle(this.vehicle)
        .subscribe(x => {
          this.toastrService.success('The vehicle was successfuly updated', 'Success')
        })
    }
    else {
      this.vehicleService.create(this.vehicle)
      .subscribe(
        x =>{console.log(x);
          this.toastrService.success('The vehicle was successfuly registered', 'Success');
        });
    }
  }

  delete(){
    if (confirm("Are you sure?"))
    this.vehicleService.deleteVehicle(this.vehicle.id)
      .subscribe(x => {
        this.router.navigate(['/home']);
      })
  }
}
