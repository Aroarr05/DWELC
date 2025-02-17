import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoListComponent } from './destino-list.component';

describe('DestinoListComponent', () => {
  let component: DestinoListComponent;
  let fixture: ComponentFixture<DestinoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
