import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDetallesComponent } from './vista-detalles.component';

describe('VistaDetallesComponent', () => {
  let component: VistaDetallesComponent;
  let fixture: ComponentFixture<VistaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
