import { Component } from '@angular/core';
import { SwService } from './sw.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  planet: Array<any> = [];
  films: Array<any> = [];

  noMovie: boolean = false;
  error: boolean = false;

  constructor(
    private swService: SwService
  ) { }

  ngOnInit() {
    this.getPlanet();
  }

  private getPlanet() {
    this.swService.getPlanets(this.numAleat()).subscribe(
      res => {
        this.error = false;

        if (res.films[0]) {
          res.films.forEach(e => {
            const film = e;
            const numFilm = film.charAt(film.length - 2);
            this.film(numFilm);
            this.noMovie = true;
          });

        } else {
          this.noMovie = false;
        }

        this.planet = res;
      },
      err => {
        this.error = true;
        console.log(`ERROR ==> ${err}`)
      }
    )
  }

  private film(film) {


    this.swService.getFilms(film).subscribe(
      res => {
        this.films.push({
          films: res.title
        })
      },
      err => console.log(err)
    )
  }

  private next() {
    this.films = [];
    this.getPlanet();
  }

  private numAleat() {

    var aleatorio = Math.floor(Math.random() * 61);

    return aleatorio;
  }
}
