import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetailService } from '../pokemon-detail/pokemon-detail.service';
import { INamedAPIResource, IPokemon } from '../pokeapi-interfaces';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemonToGet: INamedAPIResource | undefined;

  pokemon: IPokemon | undefined;
  service: PokemonDetailService | undefined;

  constructor(pokemonDetailService: PokemonDetailService) { 
    this.service = pokemonDetailService;
  }

  ngOnInit(): void {
    if (this.pokemonToGet && this.service) {
      this.service.getPokemon(this.pokemonToGet.name).subscribe((response: IPokemon) => {
        this.pokemon = response;
      });
    }
  }
}
