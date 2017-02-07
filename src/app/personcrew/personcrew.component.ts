import { Component, OnInit, Input, OnChanges, SimpleChange} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personcrew',
  templateUrl: './personcrew.component.html',
  styleUrls: ['./personcrew.component.less']
})
export class PersoncrewComponent implements OnInit, OnChanges {
  /**
  * Base Url for the movie's images
  */
  baseUrl = 'http://image.tmdb.org/t/p/w300/';
  /**
  * Person cast's credits
  */
  @Input() credits: any;
  /**
  * Flag for displaying html component
  */
  active: boolean = false;
  /**
  * Flag for ordering
  */
  orderUp: boolean = false;
  /**
  * Parameter type
  */
  parameter: string = 'Date';
  /**
  * Border color date
  */
  borderColorDate: string = '#FFC107';
  /**
  * Border color alphabetic
  */
  borderColorAlphabetic: string = '#673ab7';

  public constructor(private route: ActivatedRoute,
                     private router: Router) { }

  public ngOnInit() { }

  /**
  * Get the complete Url of the image
  * @param {String} src the source of the image
  * @return {String} The complete Url of image
  */
  public getUrl(src: string): string {
    return `${this.baseUrl}${src}`;
  }

  /**
  * Change visibility of component in the html
  */
  public changeState() {
    this.active = !this.active;
  }

  /**
  * Makes date the new ordering parameter
  */
  public changeParameterDate() {
    this.borderColorDate = '#FFC107';
    this.borderColorAlphabetic = '#673ab7';
    this.parameter = 'Date';
    this.doSort();
  }

  /**
  * Makes alphabetic the new ordering parameter
  */
  public changeParameterAlphabetic() {
    this.borderColorAlphabetic = '#FFC107';
    this.borderColorDate = '#673ab7';
    this.parameter = 'Alphabetic';
    this.doSort();
  }

  /**
  * Reverse order
  */
  public changeOrder() {
    this.orderUp = !this.orderUp;
    this.doSort();
  }

  /**
  * Restart the component
  */
  public ngOnChanges(changes) {
    this.active = false;
    this.orderUp = false;
    this.parameter = 'Date';
    this.borderColorDate = '#FFC107';
    this.borderColorAlphabetic = '#673ab7';
    this.doSort();
  }

  /**
  * Performs the ordering
  */
  public doSort() {
    if (this.parameter === 'Date') {
      if (this.orderUp) {
        this.credits.sort(function(a, b) {
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        });
      } else {
        this.credits.sort(function(a, b) {
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        });
      }
    }
    if (this.parameter === 'Alphabetic') {
      if (this.orderUp) {
        this.credits.sort(function(a, b) {
          let x = a.title.toLowerCase();
          let y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      } else {
        this.credits.sort(function(a, b) {
          let x = a.title.toLowerCase();
          let y = b.title.toLowerCase();
          return y < x ? -1 : y > x ? 1 : 0;
        });
      }
    }
  }

  /**
  * Redirect to a person
  * @param {Integer} id Movie's id
  */
  public goMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }

}
