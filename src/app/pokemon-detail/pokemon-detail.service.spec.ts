import { TestBed } from '@angular/core/testing';

import { PokemonDetailService } from './pokemon-detail.service';

describe('PokemonDetailService', () => {
  let service: PokemonDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
