import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalideTicketComponent } from './invalide-ticket.component';

describe('InvalideTicketComponent', () => {
  let component: InvalideTicketComponent;
  let fixture: ComponentFixture<InvalideTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalideTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalideTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
