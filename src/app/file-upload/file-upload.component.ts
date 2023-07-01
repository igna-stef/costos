
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Injectable, ViewEncapsulation, ViewChild} from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatStepper} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute, Router } from '@angular/router';
  

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

    firstFormGroup = this._formBuilder.group({
      firstCtrl: [false, Validators.requiredTrue],
    });
    completedFirst = false;
    secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    completedSecond = false;
    thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });

    isDragging = false;
    uploading = false;
    processing = false;
    uploadedFiles: File[] = [];
    periodos : any[] = [{}];

    periodo: any = localStorage.getItem('periodo');
    sitio_id: any = localStorage.getItem('sitio_id');

    parentLocalStorage = window.parent.localStorage;

    accesstoken = JSON.parse(this.parentLocalStorage.getItem('accesstoken') || "[]");

    constructor(private router: Router, private fileUploadService: FileUploadService, private http: HttpClient, private snackbar: MatSnackBar, private _formBuilder: FormBuilder, private matStepper: MatStepperModule, private msalService: MsalService) { }

      // updateOptionalLabel() {
      //   this.matStepper.changes.next();
      // }
  
      onDragOver(event: DragEvent): void {
          event.preventDefault();
          this.isDragging = true;
      }
    
      onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
      }
    
      onDrop(event: any): void {
        event.preventDefault();
        this.isDragging = false;
        const files = event.dataTransfer?.files;
        if (files.length > 0) {
              this.uploadFiles(files);
        }
      }

      clearUploadedFiles(): void {
        this.uploadedFiles = [];
      }

      uploadFiles(files: FileList): void {
          const url = 'http://localhost:3001/sendfilebyc';
          const formData = new FormData();
            const file = files[0];
            if (file.size <= 5242880) { // 5 MB
              formData.append('myfilebyc', file);
            }
            this.uploading=true;
          this.http.post(url, formData, { reportProgress: true, observe: 'events' }).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.Response) {
                if (event.status === 200) {
                  localStorage.setItem("periodo",event.body.periodo);
                  localStorage.setItem("sitio_id",event.body.sitio_id);
                  this.uploadedFiles = Array.from(files);
                  this.showSnackBar(event.body.msg, 'success');
                  this.completedFirst=true;
                  //actualizo los periodos subidos a la tabla
                  this.getPeriods().subscribe(data=> {
                    this.periodos = data.Periodos; 
                    console.log(data);
                  });
                } else {
                  this.showSnackBar(event.body.msg, 'error');
                }
                this.uploading = false;
              }
            },
            () => {
              this.showSnackBar('Error al subir el archivo', 'error');
              this.uploading = false;
            }
          );
      }

      procesar(): void {
          this.processing=true;
          this.sitio_id = localStorage.getItem('sitio_id');
          this.periodo = localStorage.getItem('periodo');
          const url = 'http://localhost:3001/procesar'+'?sitio_id='+this.sitio_id+'&periodo='+this.periodo;
          this.http.get(url, { reportProgress: true, observe: 'events' }).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.Response) {
                if (event.status === 200) {
                  this.showSnackBar(event.body.msg, 'success');
                  this.completedSecond=true;
                } else {
                  this.showSnackBar(event.body.msg, 'error');
                }
                this.processing = false;
              }
            },
            () => {
              this.showSnackBar('Error al procesar el archivo', 'error');
              this.processing = false;
            }
          );
      }

      reiniciar(){
        this.completedFirst=false;
        this.completedSecond=false;
        this.uploading=false;
        this.processing=false;
        // localStorage.clear();
        this.uploadedFiles = [];
      }

      showSnackBar(message: string, panelClass: 'success' | 'error') {
        this.snackbar.open(message, 'Cerrar', {
          panelClass: panelClass === 'success' ? 'snackbar-success' : 'snackbar-error',
        });
      }

      getPeriods():Observable<any>{
        return this.http.get<any>("http://localhost:3001/getPeriodos");
      }

      getname(): any {
        return this.msalService.instance.getActiveAccount()?.name;
      }
    
      isLoggedIn(): boolean{
        return this.msalService.instance.getActiveAccount() != null
      }
    
      logout(){
        this.msalService.logoutRedirect();
      }
    
      ngOnInit(): void {
        this.getPeriods().subscribe(data=> {
          this.periodos = data.Periodos; 
          console.log(data);
        });
        // localStorage.clear();
        this.msalService.instance.handleRedirectPromise().then(
          res => {
            if (res != null && res.account != null) {
              this.msalService.instance.setActiveAccount(res.account)
              console.log(res.account.idTokenClaims?.roles);
            }
          }
        )
      }

    redirect(): void {
      this.router.navigate(['/login']);
    }
}




