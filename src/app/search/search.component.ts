import { Component, OnInit, Input} from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  /**
  * Base Url for the movie's images
  */
  baseUrl = 'http://image.tmdb.org/t/p/w300/';
  /**
  * Search results for people
  */
  resultsPeople = [];
  /**
  * Search results for movies
  */
  resultsMovies = [];
  /**
  * Search phrase
  */
  searchPhrase: string;
  /**
  * Active flag
  */
  active: boolean = false;
  /**
  * Focus flag
  */
  focus: boolean = false;
  /**
  * People's color list
  */
  colorsPeople: Array<string> = [];
  /**
  * Movies's color list
  */
  colorsMovies: Array<string> = [];
  color: string = '#FFFFFF';
  /**
  * Total number of pages
  */
  totalPages: number;
  @Input() preview: boolean;

  public constructor(private movieService: MovieService,
                     private route: ActivatedRoute,
                     private router: Router) {
                     this.router.events.subscribe(path => {
                       this.clear();
                     });
  }

  public ngOnInit() { }

  /**
  * Change the state of box search
  * @param {Boolean} active Value for active flag
  */
  public changeState(active: boolean) {
    this.active = active;
  }

  /**
  * Change the state of input search
  * @param {Boolean} focus Value for focus flag
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
  * @param {Integer} i Index number for person
  */
  public putColorPeople(i: number) {
    this.colorsPeople[i] = '#C6DEFF';
  }

  /**
  * Shade background of result of movie
  * @param {Integer} i Index number for person
  */
  public putColorMovies(i: number) {
    this.colorsMovies[i] = '#C6DEFF';
  }

  /**
  * Clear background of result of person
  * @param {Integer} i Index number for person
  */
  public removeColorPeople(i: number) {
    this.colorsPeople[i] = '#FFFFFF';
  }

  /**
  * Clear background of result of movie
  * @param {Integer} i Index number for movie
  */
  public removeColorMovies(i: number) {
    this.colorsMovies[i] = '#FFFFFF';
  }

  /**
  * Reset variables
  */
  public clear() {
    this.resultsPeople = [];
    this.resultsMovies = [];
    this.searchPhrase = '';
    this.active = false;
  }

  /**
  * Performs the search of people and movies
  */
  public doSearch() {
    if (this.searchPhrase.length >= 2) {
      this.movieService.searchPerson(this.searchPhrase)
        .subscribe(resultsPeople => {
          this.resultsPeople = resultsPeople.results.slice(0, 3);
          for (let i = 0; i < this.resultsPeople.length; i++) {
            this.colorsPeople[i] = '#FFFFFF';
          }
        });
      this.movieService.searchMovie(this.searchPhrase)
        .subscribe(resultsMovies => {
          this.resultsMovies = resultsMovies.results.slice(0, 3);
          for (let i = 0; i < this.resultsPeople.length; i++) {
            this.colorsMovies[i] = '#FFFFFF';
          }
        });
    } else {
      this.resultsPeople = [];
      this.resultsMovies = [];
    }
  }

  /**
  * Get the complete Url of the image
  * @param {String} src the source of the image
  * @return {String} The complete Url of image
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
    this.router.navigate(['/searchexpanded/people/' + this.searchPhrase + '/1']);
  }
}
