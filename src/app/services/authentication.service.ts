import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'http:localhost:4200/signIn'

  constructor(private http: HttpClient) { }
}
