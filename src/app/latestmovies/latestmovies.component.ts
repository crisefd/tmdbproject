import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-latestmovies',
  templateUrl: './latestmovies.component.html',
  styleUrls: ['./latestmovies.component.less']
})
/* This class needs to be deleted ? */
export class LatestmoviesComponent implements OnInit {
  /**
  * Base Url for the movie's images
  */
  baseUrl: string = 'http://image.tmdb.org/t/p/w300/';
  /**
  * List of movies
  */
  movies: any = [];
  /**
  * Flag to preview in the toolbar
  */
  @Input() preview: boolean = false;

  public constructor(private movieService: MovieService,
                     private route: ActivatedRoute,
                     private router: Router) { }

  /**
  * Get the latest movies
  */
  public ngOnInit() {
    this.movieService.getLatest()
      .subscribe(movies => {
        if (this.preview) {
          try {
             this.movies = movies.slice(0, 4);
          } catch (err) {
            this.movies = movies;
          }
        } else {
          this.movies = movies;
        }
      });
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
  * Redirect to latestmovies component in total window
  */
  public goLatestMovies() {
    this.router.navigate(['/latestmovies']);
  }

  /**
  * Redirect to a movie
  * @param {Integer} id The movie's id
  */
  public goMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }
}
