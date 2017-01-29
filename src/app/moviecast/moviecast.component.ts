import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moviecast',
  templateUrl: './moviecast.component.html',
  styleUrls: ['./moviecast.component.less']
})
export class MoviecastComponent implements OnInit, OnChanges {
  /**
  * Image's base Url
  */
  baseUrl = 'http://image.tmdb.org/t/p/w300/';
  /**
  * Movie's credits list
  */
  @Input() credits: any;
  /**
  * Flag for showing credits
  */
  active: boolean = false;
  /**
  * Flag for ordering credits
  */
  orderUp: boolean = false;
  /**
  * Type of ordering
  */
  parameter: string = 'Relevance';
  /**
  * Border color with Relevance ordering
  */
  borderColorRelevance: string = '#FFC107';
  /**
  * Border color with Alphabetic ordering
  */
  borderColorAlphabetic: string = '#673ab7';

  public constructor(private route: ActivatedRoute, private router: Router) { }

  public ngOnInit() { }

  /**
  * Get the Complete Url of the image
  * @param {String} src Source of the image
  * @return {String} Complete Url of the image
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
  * Makes relevance the new ordering parameter
  */
  public changeParameterRelevance() {
    this.borderColorRelevance = '#FFC107';
    this.borderColorAlphabetic = '#673ab7';
    this.parameter = 'Relevance';
    this.doSort();
  }

  /**
  * Makes alphabetic the new ordering parameter
  */
  public changeParameterAlphabetic() {
    this.borderColorAlphabetic = '#FFC107';
    this.borderColorRelevance = '#673ab7';
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
    this.parameter = 'Relevance';
    this.borderColorRelevance = '#FFC107';
    this.borderColorAlphabetic = '#673ab7';
    this.doSort();
  }

  /**
  * Performs the ordering
  */
  public doSort() {
    if (this.parameter === 'Relevance') {
      if (this.orderUp) {
        this.credits.sort(function(a, b) {
          return b.order - a.order;
        });
      } else {
          this.credits.sort(function(a, b) {
          return a.order - b.order;
        });
      }
    }
    if (this.parameter === 'Alphabetic') {
      if (this.orderUp) {
        this.credits.sort(function(a, b) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      } else {
          this.credits.sort(function(a, b) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          return y < x ? -1 : y > x ? 1 : 0;
        });
      }
    }
  }

  /**
  * Redirect to a person
  * @param {Integer} id person's id
  */
  public goPerson(id: number) {
    this.router.navigate(['/person/' + id]);
  }
}

