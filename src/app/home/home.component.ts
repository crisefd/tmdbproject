import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  baseUrl = 'http://image.tmdb.org/t/p/w300/';

    /**
   * Get the complete Url ofthe  image
   * @param {String} src of the image
   * @return {String} complete Url of the image
   */
  public getUrl(src: string): string {
    return `${this.baseUrl}${src}`;
  }

}
