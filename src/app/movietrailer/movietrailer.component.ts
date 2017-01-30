import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movietrailer',
  templateUrl: './movietrailer.component.html',
  styleUrls: ['./movietrailer.component.less'],
})
export class MovietrailerComponent implements OnInit, OnChanges {
  /**
  * Video's key
  */
  @Input() key: string;
  /**
  * Flag for video's activation
  */
  active: boolean = false;
  /**
  * Video's Url
  */
  url: SafeResourceUrl;

  public constructor(public sanitizer: DomSanitizer) { }

  public ngOnInit() { }

  public ngOnChanges(changes) {
    this.active = false;
  }
  /**
  * Get video Url
  */
  public getUrlVideo(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}/?rel=0&`);
  }

  public changeState() {
    this.active = !this.active;
  }

}

