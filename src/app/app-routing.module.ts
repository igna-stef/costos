import { RouterModule, Routes } from '@angular/router';
import { MaslGuard } from './masl.guard';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo:'file-upload', pathMatch: 'full'},
  { path: '', component: FileUploadComponent},
  { path: 'login', component: LoginComponent},
  { path: 'file-upload', component: FileUploadComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
