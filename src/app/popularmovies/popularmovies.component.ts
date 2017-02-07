import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popularmovies',
  templateUrl: './popularmovies.component.html',
  styleUrls: ['./popularmovies.component.less']
})
export class PopularmoviesComponent implements OnInit {

  baseUrl = 'http://image.tmdb.org/t/p/w300/';
  movies = [];
  @Input() preview: boolean = false;

  public constructor(private movieService: MovieService, private route: ActivatedRoute,
                     private router: Router) { }

  public ngOnInit() {
    this.movieService.getPopular()
      .subscribe(movies => {
        if (this.preview) {
          this.movies = movies.slice(0, 10);
        }
        else {
          this.movies = movies;
        }
      });
  }

  public getUrl(src: string): string {
    return `${this.baseUrl}${src}`;
  }

  public goPopularMovies() {
    this.router.navigate(['/popularmovies']);
  }

  public goMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }

}
