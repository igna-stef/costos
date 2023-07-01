import { Injectable } from '@angular/core';
import { TokenService } from '../app/';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceCostos {
  constructor(private tokenService: TokenService) { }

  getToken() {
    return this.tokenService.getToken();
  }
}