import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private baseUrl = 'http://127.0.0.1:8000/api/';
    constructor(private http: HttpClient) {}

    /**
     *
     * @returns
     */
    getAllCategory() {
        return this.http.get(this.baseUrl + 'categories');
    }

    postCategory(garageBody: any) {
        return this.http.post(this.baseUrl + 'ticket/new', garageBody);
    }

    /**
     *
     *
     * @param id
     * @returns
     */
    delCategory(id: number) {
        const delUrl = `${this.baseUrl + 'deleteGarage/'}/${id}`;
        return this.http.delete(delUrl);
    }

    detailTicket(id: any) {
        return this.http.get(this.baseUrl + 'user/' + id);
    }

    updateCategory(
        id: any,
        yo: {
            contenuUser: string;
            dateUser: string;
        }
    ) {
        const updateUrl = 'http://localhost:8000/api/ticket/edit/';
        return this.http.put(updateUrl + id, yo);
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
