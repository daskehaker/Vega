import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    private get _toastr() {return this._injector.get(ToastrService);}
    
    constructor(private _injector: Injector){}

    handleError(error: any): void {
        this._toastr.error('Oops something gone wrong', 'Error')
    }
}

/*
This error can happen when the dependencies in your APP_INITIALIZER have a dependency on an Angular service, e.g. Router.

The solution is lazy injection by changing the constructor of your service to accept a Injector instead, and then resolve the value outside the constructor.*/
