import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { CategoryService } from '../../services/categories-service';
import { FormGroup, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import Swal from 'sweetalert2';
import { TicketService } from '../../services/ticket-service';
import { UserService } from '../../services/user-service';

@Component({
    selector: 'app-ticket',
    imports: [CommonModule, InputText,Textarea, FormsModule, DropdownModule],
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss'
})
export class TicketComponent {
    constructor(
        private categoryService: CategoryService,
        private ticketService : TicketService,
        private router: Router,
        private userService : UserService
    ) {}
    ticketTitle: string = '';
    ticketDescription: string = '';
    selectedCategory: number | null = null;
    selectedUser: number | null = null; // Pour stocker l'id de l'utilisateur sélectionné
    users: any[] = [];
    usersOptions: { label: string; value: number }[] = [];
    categories: any[] = [];
    ajoutTicket : any = FormGroup;
    categoriesWithIndex: { label: string; value: number }[] = [];
index = 0
    ngOnInit() {
        this.categoryService.getAllCategory().subscribe((res: any) => {
            this.categories = res;
            // Transformation : pour chaque catégorie, on crée un objet avec
            // - label : le nom de la catégorie (ici, le nom de la propriété s'appelle "nameCategory")
            // - value : un entier incrémenté (index + 1)
            this.categoriesWithIndex = this.categories.map((cat) => ({
                label: cat.nameCategory, // adapter si le nom est dans une autre propriété
                value: this.index + 1
            }));
        });

        this.userService.getUsersWithRoleUser().subscribe((res: any) => {
            this.users = res;
            // Construire les options du dropdown avec le nom complet et l'id
            this.usersOptions = this.users.map((user: any) => ({
                label: user.firstname + ' ' + user.lastname,
                value: user.id
            }));
        });


    }


    onSubmit() {
        // Construction de l'objet ticketBody à envoyer
        const ticketBody = {
            title: this.ticketTitle,
            description: this.ticketDescription,
            category_id: this.selectedCategory,
            student_id: this.selectedUser
        };
        console.log("Ticket body:", ticketBody);

        // Appel de la méthode du service pour poster le ticket
        this.ticketService.postTicket(ticketBody).subscribe(
            (response: any) => {
                // Si une réponse est reçue, on considère le POST comme réussi
                if (response) {
                    // Afficher un SweetAlert de succès, puis rediriger après confirmation
                    Swal.fire({
                        icon: 'success',
                        title: 'Ticket créé',
                        text: 'Le ticket a bien été créé.',
                        timer: 2000,  // optionnel : fermeture automatique après 2 secondes
                        showConfirmButton: false
                    }).then(() => {
                        //this.router.navigate(['/list/ticket']);
                        this.ngOnInit();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Réponse vide du serveur.'
                    });
                }
            },
            (error: any) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Impossible de se connecter au serveur'
                });
            }
        );
    }






}

