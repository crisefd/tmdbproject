import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.less']
})
export class MovieComponent implements OnInit {
  /**
  * Base Url for the movie's images
  */
  baseUrl: string = 'http://image.tmdb.org/t/p/w300/';
  /**
  * Movie details
  */
  details: any = {};
  /**
  * Trailer's key video
  */
  keyvideo: string;

  public constructor(private movieService: MovieService,
                     private route: ActivatedRoute,
                     private router: Router) { }

  /**
  * Get a movie with your id
  */
  public ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.movieService.getMovie(id).subscribe(details => {
        this.details = details;
        if (this.details['videos']) { this.keyvideo = this.details['videos'].results[0]; }
      });
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

}
