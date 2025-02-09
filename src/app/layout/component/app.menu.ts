import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit() {
        const role = this.authService.getUserRole();

        const authItems: MenuItem[] = [
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Se déconnecter', icon: 'pi pi-fw pi-sign-in', routerLink: ['/auth/login'] },
                    // { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/auth/error'] },
                    // { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/auth/access'] }
                ]
            },
            {
                label: '',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/pages/crud']
            }
        ];

        let ticketItems: MenuItem[] = [];

        if (role === 'admin') {
            // Pour admin, on n'affiche pas "Ajouter un ticket"
            ticketItems = [
                { label: 'Liste des tickets non traités', icon: 'pi pi-fw pi-bars', routerLink: ['/list/ticket'] },
                { label: 'Ticket(s) déjà traité(s)', icon: 'pi pi-fw pi-cart', routerLink: ['/trash/ticket'] },
                { label: 'Ticket(s) rejeté(s)', icon: 'pi pi-fw pi-cart', routerLink: ['/invalide/ticket'] }
            ];
        } else if (role === 'etudiant') {
            // Pour etudiant, on affiche l'ajout ainsi que les autres items
            ticketItems = [
                { label: 'Ajouter un ticket', icon: 'pi pi-fw pi-plus', routerLink: ['/add/ticket'] },
                { label: 'Ticket(s) déjà traité(s)', icon: 'pi pi-fw pi-cart', routerLink: ['/trash/ticket'] },
                { label: 'Ticket(s) rejeté(s)', icon: 'pi pi-fw pi-cart', routerLink: ['/invalide/ticket'] }
            ];
        } else {
            // Pour tout autre rôle ou par défaut, on affiche au moins l'ajout
            ticketItems = [
                { label: 'Ajouter un ticket', icon: 'pi pi-fw pi-plus', routerLink: ['/add/ticket'] }
            ];
        }

        this.model = [
            ...authItems,
            {
                label: 'Gestion de tickets',
                items: [
                    {
                        label: 'Ticket',
                        icon: 'pi pi-fw pi-list',
                        items: ticketItems
                    }
                ]
            }
        ];
    }
}
