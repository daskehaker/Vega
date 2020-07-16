import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IMake {
  id: number;
  name: string;
  models: IModel[];
}

export interface IModel {
  id: number;
  name: string;
}

export interface IVehicle {
  id?: number;
  makeId: number;
  modelId: number;
  features;
  contact: {
    name: string;
    phone: string;
    email: string;
  }
  IsRegistered: boolean;
}

export interface IFeature {
  id: number;
  name: string;
}

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = 'api/vehicles';
  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get('api/makes');
  }

  getFeatures() {
    return this.http.get('api/features');
  }

  create(vehicle){
    return this.http.post(this.vehiclesEndpoint, vehicle);
  }

  updateVehicle(vehicle){
    return this.http.put(this.vehiclesEndpoint + '/' + +vehicle.id, vehicle);
  }
  
  deleteVehicle(id){
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter){
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj){
    var parts = [];
    for (var property in obj){
      var value = obj[property]
      if(value != null && value != undefined){
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
      }
    }
    return parts.join('&')
  }
}
