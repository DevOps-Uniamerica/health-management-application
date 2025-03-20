import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicaoFormComponent } from './refeicao-form.component';

describe('RefeicaoFormComponent', () => {
  let component: RefeicaoFormComponent;
  let fixture: ComponentFixture<RefeicaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefeicaoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefeicaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
