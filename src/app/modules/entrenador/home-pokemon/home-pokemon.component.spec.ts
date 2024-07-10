import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePokemonComponent } from './home-pokemon.component';

describe('HomePokemonComponent', () => {
  let component: HomePokemonComponent;
  let fixture: ComponentFixture<HomePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePokemonComponent]
    });
    fixture = TestBed.createComponent(HomePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
