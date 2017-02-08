import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchexpanded',
  templateUrl: './searchexpanded.component.html',
  styleUrls: ['./searchexpanded.component.less']
})
export class SearchexpandedComponent implements OnInit {

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
  search: string;
  /**
  * 
  */
  page: number;
  /**
  * 
  */
  numberPage: number;
  /**
  * 
  */
  numberPageArray: any;
  /**
  * Color list
  */
  colors: Array<string> = [];
  /**
  * Border color person
  */
  borderColorPerson: string;
  /**
  * Border color movie
  */
  borderColorMovie: string;
  /**
  * 
  */
  parameter: string;
  /**
  * 
  */
  colorsPagination: Array<string>;

  public constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  /**
  * Performs a search with the route parameters
  */
  public ngOnInit() {
    this.route.params.subscribe(params => {
      this.parameter = params['parameter'];
      this.search = params['search'];
      this.page = params['page'];
      if (this.parameter === 'movies') {
        this.movieService.searchMovie(this.search, this.page)
          .subscribe(resultsMovies => {
            this.resultsMovies = resultsMovies.results;
            this.numberPage = resultsMovies.total_pages;
            this.colorsPagination = Array(this.numberPage).fill('#FFFFFF');
            this.borderColorPerson = '#ffd740';
            this.borderColorMovie = '#673ab7';
            this.setColorPagination();
          });
      } else {
        this.movieService.searchPerson(this.search, this.page)
          .subscribe(resultsPeople => {
            this.resultsPeople = resultsPeople.results;
            this.numberPage = resultsPeople.total_pages;
            this.colorsPagination = Array(this.numberPage).fill('#FFFFFF');
            this.borderColorPerson = '#673ab7';
            this.borderColorMovie = '#ffd740';
            this.setColorPagination();
          });
      }
    });
  }

  /**
  * Go to the next page
  */
  public goForward() {
    if (this.page - (-1) <= this.colorsPagination.length) {
      return this.page - (-1);
    } else {
      return this.page;
    }
  }

  /**
  * Go to the back page
  */
  public goBack() {

    if (this.page - 1 > 0) {
      return this.page - 1;
    } else {
      return this.page;
    }
  }

  /**
  * Change the background of the current page
  */
  public setColorPagination() {
    this.colorsPagination[this.page - 1] = '#673AB7';
  }

  /**
  * People are now looking for
  */
  public changeParameterPerson() {
    this.router.navigate(['searchexpanded/persons/' + this.search + '/1']);
  }

  /**
  * Movies are now looking for
  */
  public changeParameterMovie() {
    this.router.navigate(['searchexpanded/movies/' + this.search + '/1']);
  }

  /**
  * Add background of selected div
  * @param {Integer} i Index of color
  */
  public putColor(i: number) {
    this.colors[i] = '#C6DEFF';
  }

  /**
  * Remove background of selected div
  * @param {Integer} i Index of color
  */
  public removeColor(i: number) {
    this.colors[i] = '#FFFFFF';
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
  * Redirects to next page
  * @param {String} type
  */
  public goForwardPage(type: string) {
    this.router.navigate(['/searchexpanded/' + type + '/' + this.search + '/' + this.goForward()]);
  }

  /**
  * Redirects to back page
  * @param {String} type
  */
  public goBackPage(type: string) {
    this.router.navigate(['/searchexpanded/' + type + '/' + this.search + '/' + this.goBack()]);
  }

  /**
  * Redirects to the selected page
  * @param {Any} page
  * @param {String} type
  */
  public goPage(page: any, type: string) {
    this.router.navigate(['/searchexpanded/' + type + '/' + this.search + '/' + page]);
  }

  /**
  * Redirect to a person
  * @param {Integer} id Person's id
  */
  public goPerson(id: number) {
    this.router.navigate(['/person/' + id]);
  }

  /**
  * Redirect to a movie
  * @param {Integer} id Movie's id
  */
  public goMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }

}
