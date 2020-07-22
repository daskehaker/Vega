import { ToastrService } from 'ngx-toastr';
import { ProgressService } from './../services/progress.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-photos',
  templateUrl: './vehicle-photos.component.html',
  styleUrls: ['./vehicle-photos.component.css']
})
export class VehiclePhotosComponent implements OnInit {
  id: number;
  photos: any[];
  uploadResponse = {status: '', message: '', fileName: ''};
  //uploadResponse = {status: '', message: 0};
  error: any={};
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    router: Router,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private zone: NgZone,
    private toastrService: ToastrService) {
      route.params.subscribe(p => this.id = +p['id']);
      if(isNaN(this.id) || this.id <= 0){
        router.navigate(['/vehicles']);
        return;
      }
  }

  ngOnInit(): void {
    this.photoService.get(this.id).subscribe((photos: any[]) => this.photos = photos)
  }

  uploadPhoto(){
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement
    this.photoService.upload(this.id, nativeElement.files[0]).subscribe(
      (res: any) =>{
        this.zone.run(() => {
          this.uploadResponse = res;
          /*if(this.uploadResponse.fileName.length > 0){
            this.photos.push(this.uploadResponse)
          }*/
        })
        console.log(res)
      },
      (err) =>{
        this.error = err;
        this.toastrService.error('Your Photo was not uploaded (acceptable file types: .jpg .png .jpeg)', 'Error');
      }
      // () =>{
      //   this.uploadResponse = null;
      // }
      )//.unsubscribe()
      // this.photos.push(this.uploadResponse)
  }

}
