import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket-service';
import { DatePipe } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-ex-ticket',
    imports: [DatePipe, PrimeTemplate, TableModule],
    templateUrl: './ex-ticket.component.html',
    styleUrl: './ex-ticket.component.scss'
})
export class ExTicketComponent {
    tickets: any;
    nbticket: any;
    constructor(
        private router: Router,
        private ticketService: TicketService
    ) {}

    ngOnInit() {
        this.ticketService.getTraitesTicket().subscribe(async (res: any) => {
            this.tickets = res;
            this.nbticket = this.tickets.length;
        });
    }
}
