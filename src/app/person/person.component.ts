import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.less']
})
export class PersonComponent implements OnInit {
  /**
  * Base Url for the images
  */
  baseUrl = 'http://image.tmdb.org/t/p/w300/';
  /**
  * Person's detail list
  */
  details: any = {};

  public constructor(private movieService: MovieService,
                     private route: ActivatedRoute,
                     private router: Router) { }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.movieService.getPerson(id).subscribe(details => {
        this.details = details;
      });
    });
  }

  /**
  * Get the complete Url of the image
  * @param {String} src the source of the image
  * @return {String} The complete Url of the image
  */
  public getUrl(src: string): string {
    return `${this.baseUrl}${src}`;
  }
}
