import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';
import { Admin } from 'src/app/models/admin';
import { GlobalService } from '../global.service';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  AnimeArray: Admin[] = [];
  data = false;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  output: any;

  constructor(private router: Router, private dataService: RegisterService, private uploadService: GlobalService) { }

  ngOnInit(): void {
  
  }

  EditAnime(ids: number) {
    this.router.navigate(['/edit-admin', { id: ids }])
  }

  DeleteAnime(id: number, name: string) {
    this.dataService.DeleteAnime(id)
      .subscribe(() => {
        this.AnimeArray = [];
        this.ngOnInit();        
    })
  }//Delete Anime

  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);
          this.output = event.body;  
        }  
      });  
  }

  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
    for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }  
      this.uploadFiles();  
    };  
    fileUpload.click();  
}


}
