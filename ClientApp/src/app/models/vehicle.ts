export interface Vehicle{
    id: number;
    model: KeyValuePair;
    make :KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;
}

export interface VehicleInfo{
    make: string;
    model: string;
    isRegistered: boolean;
    features: string[];
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

export interface SaveVehicle{
    id?: number;
    modelId: number;
    makeId :number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}

export interface Contact{
    name: string;
    phone: string;
    email: string;
}

export interface KeyValuePair{
    id: number;
    name: string;
}