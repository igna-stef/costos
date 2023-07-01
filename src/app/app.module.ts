import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule} from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment.api-mock';


export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
		clientId: environment.clientId,
        redirectUri: environment.redirectUri,
        postLogoutRedirectUri: environment.postLogoutRedirectUri,
		authority: environment.authority,        
        navigateToLoginRequestUrl: true,
    }
  })
}


	
@NgModule({
declarations: [
	AppComponent,
	FileUploadComponent,
 	LoginComponent,
],
imports: [
	AppRoutingModule,
	BrowserModule,
	HttpClientModule,
	BrowserAnimationsModule,
	MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
	MatProgressSpinnerModule,
	MatSnackBarModule,
	MatStepperModule,
	MatInputModule,
	MatFormFieldModule,
	ReactiveFormsModule,
	MsalModule,
	MatToolbarModule,
	MatMenuModule
],
providers: [
	{
		provide: MSAL_INSTANCE,
		useFactory: MSALInstanceFactory
	  },
	  MsalService
],
bootstrap: [AppComponent]
})
export class AppModule { }
