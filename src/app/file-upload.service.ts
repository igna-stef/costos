import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class FileUploadService {
	
// API url
baseApiUrl = "localhost:4000/sendfilebyc"
	
constructor(private http:HttpClient) { }

// Returns an observable
upload(file: File):Observable<any> {
	// Create form data
	const formData = new FormData();
	// Store form name as "file" with file data
	formData.append("myfilebyc", file);
	// Make http post request over api
	// with formData as req
	return this.http.post(this.baseApiUrl, file)
}

  uploadFile(file: File): Observable<any> {
	const formData = new FormData();
	formData.append('myfilebyc', file);
	return this.http.post<any>(this.baseApiUrl, file);
  }

}