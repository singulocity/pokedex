import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IPokemon } from '../pokeapi-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailService {

  constructor(private http: HttpClient) { }

  getPokemon(name: string): Observable<IPokemon> {
    let url = Constants.POKEAPI_ROOT + Constants.POKEMON_ROUTE + name + '/';
    return this.http.get<IPokemon>(url);
  }
}
