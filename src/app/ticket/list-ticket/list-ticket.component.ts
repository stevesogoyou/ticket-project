import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket-service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2'; // Import du module MatIconModule


@Component({
    selector: 'app-list-ticket',
    imports: [TableModule,CommonModule,MatIconModule],
    templateUrl: './list-ticket.component.html',
    styleUrl: './list-ticket.component.scss'
})
export class ListTicketComponent {

    tickets : any;
    nbticket : any;
    constructor( private router: Router,
                 private ticketService : TicketService, ) {}


    ngOnInit(){
        this.ticketService.getAllTicket().subscribe(async  (res:any)=>{
            this.tickets = res;
            this.nbticket = this.tickets.length;
        })}


    updateTicketStatusWithConfirmation(ticket: any, newStatus: string): void {
        let title = '';
        let text = '';

        if (newStatus === 'en cours') {
            title = 'Passer en cours';
            text = "Voulez-vous vraiment changer le statut de ce ticket en 'en cours' ?";
        } else if (newStatus === 'traité') {
            title = 'Valider le ticket';
            text = "Voulez-vous vraiment valider ce ticket et le passer en 'traité' ?";
        }

        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                const updateData = { status: newStatus };
                this.ticketService.updateTicketStatut(ticket.id, updateData).subscribe(
                    (updatedTicket: any) => {
                        // Mise à jour locale du statut du ticket
                        ticket.status = updatedTicket.status;
                        Swal.fire({
                            icon: 'success',
                            title: 'Mise à jour réussie',
                            text: `Le statut du ticket a été mis à jour en '${newStatus}'.`
                        });
                    },
                    (error) => {
                        console.error('Erreur lors de la mise à jour du ticket', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Une erreur est survenue lors de la mise à jour du ticket.'
                        });
                    }
                );
            }
        });
    }





    invalidateTicket(ticket: any) {
        Swal.fire({
            title: 'Rejet du ticket',
            text: 'Veuillez saisir le message expliquant pourquoi vous rejetez ce ticket :',
            input: 'textarea',
            inputPlaceholder: 'Tapez ici votre message...',
            inputAttributes: {
                'aria-label': 'Tapez ici votre message'
            },
            showCancelButton: true,
            confirmButtonText: 'Envoyer',
            cancelButtonText: 'Annuler',
            preConfirm: (inputValue) => {
                if (!inputValue) {
                    Swal.showValidationMessage('Veuillez entrer un message de rejet');
                }
                return inputValue;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Création de l'objet de mise à jour avec le statut "invalide" et le message de refus
                const updateData = {
                    status: 'invalide',
                    message_refus: result.value
                };

                // Appel de la méthode du service pour mettre à jour le ticket
                this.ticketService.updateTicketMesRefus(ticket.id, updateData).subscribe(
                    (updatedTicket: any) => {
                        // Mise à jour locale du ticket avec les nouvelles valeurs retournées par le backend
                        ticket.status = updatedTicket.status;
                        ticket.message_refus = updatedTicket.message_refus;

                        Swal.fire({
                            icon: 'success',
                            title: 'Ticket rejeté',
                            text: 'Le ticket a été rejeté avec succès.'
                        });
                        this.ngOnInit();
                    },
                    (error) => {
                        console.error('Erreur lors de la mise à jour du ticket', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Une erreur est survenue lors de la mise à jour du ticket.'
                        });
                    }
                );
            }
        });
    }

}
