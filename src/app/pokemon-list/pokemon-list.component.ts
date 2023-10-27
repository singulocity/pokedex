import { Component } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { INamedAPIResourceList, IPokemon } from '../pokeapi-interfaces';
import { PokemonDetailService } from '../pokemon-detail/pokemon-detail.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemon: IPokemon[] = [];
  
  constructor(pokemonListService: PokemonListService, pokemonDetailService: PokemonDetailService) {
    pokemonListService.getPokemonList().subscribe((response: INamedAPIResourceList) => {
      if (response.results) {
        response.results.forEach(pokemon => {
          if (pokemon && pokemonListService) {
            pokemonDetailService.getPokemon(pokemon.name).subscribe((response: IPokemon) => {
              this.pokemon.push(response);
            });
          }
        });
      }
    });
  }
}
