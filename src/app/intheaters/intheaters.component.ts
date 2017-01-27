import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intheaters',
  templateUrl: './intheaters.component.html',
  styleUrls: ['./intheaters.component.less']
})

export class IntheatersComponent implements OnInit {
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

  // href: string = '#/movie/{{ movie.id }}';

  /**
  * Declares and initialize MovieService, ActivatedRoute and Route services
  */
  public constructor(private movieService: MovieService,
                     private route: ActivatedRoute,
                     private router: Router) { }

  /**
  * Get the movies in theaters on init
  */
  public ngOnInit() {
    this.movieService.getPopular()
      .subscribe(movies => {
        if (this.preview) {
          try {
            this.movies = movies.slice(0, 5);
          } catch (err) {
            this.movies = movies;
          }
        } else {
          this.movies = movies;
        }
      });
  }

  /**
  * Get the complete Url of image
  * @param {String} src of the image
  * @return {String} complete Url of the image
  */
  public getUrl(src: string): string {
    return `${this.baseUrl}${src}`;
  }

  /**
  * Redirect to Intheaters component in total window
  */
  public goInTheaters() {
    this.router.navigate(['/intheaters']);
  }

  /**
  * Redirect to a movie
  * @param {Integer} id a movie's id
  */
  public goMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }
}
