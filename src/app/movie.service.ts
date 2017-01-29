import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

/**
* @author Cristhian Fuertes <cristhian.fuertes@correounivalle.edu.co>
* @version 0.1
* Perform search operations in themovie.org API
*/

@Injectable()
export class MovieService {

  /**
  * {String} themoviedb.org's API key
  */
  private apiKey: string = '';

  /**
  * {String} themoviedb.org's API url 
  */
  private url: string = '';

  /**
  * {String} themoviedb.org's API version 
  */
  private apiVer: string = '';

  /**
  * Declares an initializes the Http attribute,
  * initializes the apiKey, url and apiVer attributes using the
  * api-config.json file
  */
  public constructor(private http: Http) {
    let json = require('../../api-config.json');
    this.apiKey = json['token'];
    this.apiVer = json['api_version'];
    this.url = `//api.themoviedb.org/${this.apiVer}`;
   }

  /**
  * Get most popular movies
  * @return {Array} search results for popular movies
  */
  public getPopular(): Observable<any> {
    let request = `${this.url}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(request)
      .map(response => {
        return response.json().results;
      });
  }

  /**
  * Get top rated movies
  * @return {Array} search results for top rated movies
  */
  public getTop(): Observable<any> {
    let request = `${this.url}/movie/top_rated?api_key=${this.apiKey}`;
    return this.http.get(request)
      .map(response => {
        return response.json().results;
      });
  }

  /**
  * Get latest movies
  * @return {Array} search results for latest movies
  */
  public getLatest(): Observable<any> {
    let request = `${this.url}/movie/latest?api_key=${this.apiKey}`;
    return this.http.get(request)
      .map(response => {
        return response.json().results;
      });
  }

  /**
  * Get in theathers movies
  * @return {Array} search results for in thearers movies
  */
  public getInTheaters(): Observable<any> {
    let request = `${this.url}/movie/now_playing?api_key=${this.apiKey}`;
    return this.http.get(request)
      .map(response => {
        return response.json().results;
      });
  }
  /**
  * Get upcoming movies
  * @return {Array} search results for upcoming movies
  */
  public getUpComing(): Observable<any> {
    let request = `${this.url}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get(request)
      .map(response => {
        return response.json().results;
      });
  }

  /**
  * Get a movie
  * @param {Integer} id the movie's id
  * @return {Object} search result for the movie
  */
  public getMovie(id: number): Observable<any> {
    let request = `${this.url}/movie/${id}?api_key=${this.apiKey}&append_to_response=alternative_titles,credits,releases,videos,similar,reviews,images`;
    return this.http.get(request)
      .map(response => {
        return response.json();
      });
  }

  /**
  * Get a person
  * @param {Integer} id the person's id
  * @return {Object} search result for person
  */
  public getPerson(id: number): Observable<any> {
    let request = `${this.url}/person/${id}?api_key=${this.apiKey}&append_to_response=alternative_titles,credits,releases,videos,similar,reviews,images`;
    return this.http.get(request)
      .map(response => {
        return response.json();
      });
  }

  /**
  * search multi (movie, tv, person, etc.,) by query phrase
  * @param {String} phrase the query's phrase
  * @param {Integer} page the page number
  * @return {Array} search results for multi
  */
  public search(phrase: string, page = 1): Observable<any> {
    let request = `${this.url}/search/multi?api_key=${this.apiKey}&query=${phrase}&page=${page}&include_adult=false`;
    return this.http.get(request)
      .map(response => {
        return response.json().results;
      });
  }

  /**
  * search person by query phrase
  * @param {String} phrase the query's phrase
  * @param {Integer} page the page number
  * @return {Object} search result for person
  */
  public searchPerson(phrase: string, page = 1): Observable<any> {
    let request = `${this.url}/search/person?api_key=${this.apiKey}&query=${phrase}&page=${page}&include_adult=false`;
    return this.http.get(request)
      .map(response => {
        return response.json();
      });
  }

  /**
  * search movie by query phrase
  * @param {String} phrase the query's phrase
  * @param {Integer} page the page number
  * @return search result for movie
  */
  public searchMovie(phrase: string, page = 1): Observable<any> {
    let request = `${this.url}/search/movie?api_key=${this.apiKey}&query=${phrase}&page=${page}&include_adult=false`;
    return this.http.get(request)
      .map(response => {
        return response.json();
      });
  }
}
