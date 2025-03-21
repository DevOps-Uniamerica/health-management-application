import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormComponent } from './atividade-form.component';

describe('AtividadeFormComponent', () => {
  let component: AtividadeFormComponent;
  let fixture: ComponentFixture<AtividadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
