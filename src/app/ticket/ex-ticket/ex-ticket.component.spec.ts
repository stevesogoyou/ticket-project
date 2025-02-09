import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTicketComponent } from './ex-ticket.component';

describe('ExTicketComponent', () => {
  let component: ExTicketComponent;
  let fixture: ComponentFixture<ExTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
