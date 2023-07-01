import { RedirectHandler } from '@azure/msal-browser/dist/internals';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private msalService: MsalService, private router: Router, private route: ActivatedRoute){
  }

  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginRedirect();
  }

  logout(){
    this.msalService.logoutRedirect();
  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account);
          this.redirect();
        }
      }
    )
  }

  redirect(): void {
    if (this.isLoggedIn()){
      console.log(this.isLoggedIn());
      this.router.navigate(['/file-upload']);
    }
  }

}