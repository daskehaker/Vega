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
  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get('api/makes');
  }

  getFeatures() {
    return this.http.get('api/features');
  }

  create(vehicle){
    return this.http.post('/api/vehicles', vehicle);
  }

  updateVehicle(vehicle){
    return this.http.put('/api/vehicles/' + +vehicle.id, vehicle);
  }
  
  deleteVehicle(id){
    return this.http.delete('/api/vehicles/' + id)
  }
  getVehicle(id) {
    return this.http.get('api/vehicles/' + id);
  }
}
