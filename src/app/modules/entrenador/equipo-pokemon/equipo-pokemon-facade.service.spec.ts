import { TestBed } from '@angular/core/testing';

import { EquipoPokemonFacadeService } from './equipo-pokemon-facade.service';

describe('EquipoPokemonFacadeService', () => {
  let service: EquipoPokemonFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipoPokemonFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
