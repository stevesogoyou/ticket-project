import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { NgModule } from '@angular/core';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import {TicketComponent} from './app/ticket/add/ticket.component';
import {ListTicketComponent} from './app/ticket/list-ticket/list-ticket.component';
import {ExTicketComponent} from './app/ticket/ex-ticket/ex-ticket.component';
import { InvalideTicketComponent } from './app/ticket/invalide-ticket/invalide-ticket.component';
import { RoleGuard } from './app/guards/role.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: ListTicketComponent },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            {path : 'add/ticket', component: TicketComponent,
                canActivate: [RoleGuard],
                data: { expectedRole: 'etudiant'}
            },
            {path : 'list/ticket', component: ListTicketComponent,
                canActivate: [RoleGuard],
                data: { expectedRole: 'admin' }
            },
            {path : 'trash/ticket', component: ExTicketComponent},
            {path : 'invalide/ticket', component: InvalideTicketComponent,
                canActivate: [RoleGuard],
                data: { expectedRole: ['admin', 'etudiant'] } // Par exemple, seuls les admins/etudiants peuvent accéder
            }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },
];
