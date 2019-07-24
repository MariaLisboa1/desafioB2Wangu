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

  noFilm: string = "";
  error: boolean = false;

  getBtn
  span

  constructor(
    private swService: SwService
  ) { }

  ngOnInit() {
    this.getPlanet();
    this.getBtn = document.getElementById('btn');
    this.span = document.getElementById('span');
  }

  private getPlanet() {
    this.swService.getPlanets(this.numRandom()).subscribe(
      res => {
        this.error = false;

        if (res.films[0]) {
          res.films.forEach(e => {
            const film = e;
            const numFilm = film.charAt(film.length - 2);
            this.film(numFilm);
            this.noFilm = "";
          });

        } else {
          this.noFilm = "No Film";
          this.getBtn.classList.add("btn");
          this.getBtn.classList.remove("is-loading");
        }

        this.planet = res;
      },
      err => this.handleError(err)
    )
  }

  private film(film) {
    this.swService.getFilms(film).subscribe(
      res => {
        this.films.push({
          films: res.title
        });
        this.getBtn.classList.add("btn");
        this.getBtn.classList.remove("is-loading");
      },
      err => this.handleError(err)

    )
  }

  private handleError(error) {
    this.getBtn.classList.add("is-fail");
    this.span.innerHTML = "ERROR";
    this.error = true;
    console.log(`ERROR => ${error}`);
  }

  private next() {

    this.getBtn = document.getElementById('btn');
    this.getBtn.classList.add("is-loading");

    this.films = [];
    this.getPlanet();
  }

  private numRandom() {

    let drawn = [];
    const maxValue = 61;

    if (drawn.length === maxValue) {
      alert('No more planets :(');
    }
    let suggestion = Math.ceil(Math.random() * maxValue);
    while (drawn.indexOf(suggestion) >= 0) {
      suggestion = Math.ceil(Math.random() * maxValue);
    }
    drawn.push(suggestion);
    return suggestion;
  }
  
}
