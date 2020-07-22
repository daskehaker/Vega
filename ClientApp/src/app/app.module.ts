import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, XhrFactory } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PaginationComponent } from './pagination/pagination.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { HomeComponent } from './home/home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleNavbarComponent } from './vehicle-navbar/vehicle-navbar.component';
import { VehiclePhotosComponent } from './vehicle-photos/vehicle-photos.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { PhotoService } from './services/photo.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    VehicleFormComponent,
    HomeComponent,
    VehicleListComponent,
    PaginationComponent,
    VehicleNavbarComponent,
    VehiclePhotosComponent,
    VehicleInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'vehicles/photos', component: VehiclePhotosComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/photos/:id', component: VehiclePhotosComponent },
      { path: 'vehicles/:id', component: VehicleInfoComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    //{provide: XhrFactory, useClass: BrowserXhrWithProgress},
    VehicleService,
    PhotoService,
    ProgressService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
