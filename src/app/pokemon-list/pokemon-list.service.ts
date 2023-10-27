import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Observable } from 'rxjs/internal/Observable';
import { INamedAPIResourceList } from '../pokeapi-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  
  constructor(private http: HttpClient) { }

  getPokemonList(from: string = '', to: string = ''): Observable<INamedAPIResourceList> {
    let url = Constants.POKEAPI_ROOT + Constants.POKEMON_ROUTE;
    if (from != '' && Number(from)) {
      url += '?' + Constants.OFFSET + from;
      if (to != '' && Number(to)) {
        url += '&' + Constants.LIMIT + to;
      } else {
        url += '&' + Constants.LIMIT + Constants.LIMIT_AMOUNT;
      }
    }
    return this.http.get<INamedAPIResourceList>(url);
  }
}
