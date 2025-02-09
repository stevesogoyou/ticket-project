import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    private baseUrl = 'http://127.0.0.1:8000/api/';
    constructor(private http: HttpClient) {}

    /**
     *
     * @returns
     */
    getAllTicket() {
        return this.http.get(this.baseUrl + 'tickets/nouveaux');
    }
    getInvalideTicket() {
        return this.http.get(this.baseUrl + 'tickets/invalides');
    }
    getTraitesTicket() {
        return this.http.get(this.baseUrl + 'tickets/traites');
    }

    postTicket(ticketBody: any) {
        return this.http.post(this.baseUrl + 'ticket/new', ticketBody);
    }

    /**
     *
     *
     * @param id
     * @returns
     */
    delTicket(id: number) {
        const delUrl = `${this.baseUrl + 'deleteGarage/'}/${id}`;
        return this.http.delete(delUrl);
    }

    detailTicket(id: any) {
        return this.http.get(this.baseUrl + 'user/' + id);
    }

    updateTicketStatut(
        id: any,
        yo: {
            "status": any
        }
    ) {
        const updateUrl = 'http://localhost:8000/api/ticket/edit/';
        return this.http.put(updateUrl + id, yo);
    }

    updateTicketMesRefus(
        id: any,
        updateData: { status: any, message_refus: any }
    ) {
        const updateUrl = 'http://localhost:8000/api/ticket/edit/';
        return this.http.put(updateUrl + id, updateData);
    }

    User() {
        const setting = {
            width: '450px',
            type: 'green',
            title: 'Notication title',
            body: 'The Userication will viewable directly in your component',
            position: 'bottom right',
        };
    }
}
