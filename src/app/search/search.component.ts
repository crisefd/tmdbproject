import { Component, OnInit, Input} from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  baseUrl = 'http://image.tmdb.org/t/p/w300/';
  resultsPersons = [];
  resultsMovies = [];
  search_phrase: string;
  active: boolean = false;
  focus: boolean = false;
  colorsPersons: Array<string> = [];
  colorsMovies: Array<string> = [];
  color: string = '#FFFFFF';
  totalPages: number;
  @Input() preview: boolean;

  public constructor(private movieService: MovieService,
                     private route: ActivatedRoute,
                     private router: Router) {
    this.router.events.subscribe(path => {
      this.clear();
    });
  }

  public ngOnInit() {}

  /**
  * Change the state of box search
  */
  public changeState(active: boolean) {
    this.active = active;
  }

  /**
  * Change the state of input search
  */
  public changeFocus(focus: boolean) {
    this.focus = focus;
  }

  /**
  * Shade background of "see all results"
  */
  public putColor() {
    this.color = '#C6DEFF';
  }

  /**
  * clear background of "see all results"
  */
  public removeColor() {
    this.color = '#FFFFFF';
  }

  /**
  * Shade background of result of person
  */
  public putColorPersons(i: number) {
    this.colorsPersons[i] = '#C6DEFF';
  }

  /**
  * Shade background of result of movie
  */
  public putColorMovies(i: number) {
    this.colorsMovies[i] = '#C6DEFF';
  }

  /**
  * Clear background of result of person
  */
  public removeColorPersons(i: number) {
    this.colorsPersons[i] = '#FFFFFF';
  }

  /**
  * Clear background of result of movie
  */
  public removeColorMovies(i: number) {
    this.colorsMovies[i] = '#FFFFFF';
  }

  /**
  * Reset variables
  */
  public clear() {
    this.resultsPersons = [];
    this.resultsMovies = [];
    this.search_phrase = '';
    this.active = false;
  }

  /**
  * Performs the search of persons and movies
  */
  public doSearch() {
    if (this.search_phrase.length >= 2) {
      this.movieService.searchPerson(this.search_phrase)
        .subscribe(resultsPersons => {
          this.resultsPersons = resultsPersons.results.slice(0, 3);
          for (let i = 0; i < this.resultsPersons.length; i++) {
            this.colorsPersons[i] = '#FFFFFF';
          }
        });
      this.movieService.searchMovie(this.search_phrase)
        .subscribe(resultsMovies => {
          this.resultsMovies = resultsMovies.results.slice(0, 3);
          for (let i = 0; i < this.resultsPersons.length; i++) {
            this.colorsMovies[i] = '#FFFFFF';
          }
        });


    } else {
      this.resultsPersons = [];
      this.resultsMovies = [];
    }
  }

  /**
  * Get the complete Url of image
  * @param {String} src the source of the  image
  * @return {String} complete Url of  the image
  */
  public getUrl(src: string): string {
    return `${this.baseUrl}${src}`;
  }

  /**
  * Redirect to a person
  * @param {Integer} id the person's id
  */
  public goPerson(id: number) {
    this.router.navigate(['/person/' + id]);
  }

  /**
  * Redirect to a movie
  * @param {Integer} id the movie's id
  */
  public goMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }

  /**
  * Redirect to expanded search
  */
  public goExpanded() {
    this.router.navigate(['/searchexpanded/persons/' + this.search_phrase + '/1']);
  }
}
