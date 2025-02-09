import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket-service';
import { DatePipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-invalide-ticket',
    imports: [PrimeTemplate, TableModule, DatePipe],
    templateUrl: './invalide-ticket.component.html',
    styleUrl: './invalide-ticket.component.scss'
})
export class InvalideTicketComponent {
    tickets: any;
    nbticket: any;
    constructor(
        private router: Router,
        private ticketService: TicketService
    ) {}

    ngOnInit() {
        this.ticketService.getInvalideTicket().subscribe(async (res: any) => {
            this.tickets = res;
            this.nbticket = this.tickets.length;
        });
    }
}
