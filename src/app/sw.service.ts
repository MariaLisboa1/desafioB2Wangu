import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwService {

  BASE_URL: string = "https://swapi.co/api/";

  constructor(private http: HttpClient) { }


  getPlanets(num){
    return this.http.get<any>(`${this.BASE_URL}planets/${num}/`);
  }

  getFilms(films) {
    return this.http.get<any>(`${this.BASE_URL}films/${films}/`);
  }
}
