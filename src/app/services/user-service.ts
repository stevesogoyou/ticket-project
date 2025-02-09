import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private baseUrl = 'http://127.0.0.1:8000/api/';
    constructor(private http: HttpClient) {}

    /**
     *
     * @returns
     */
    getUsersWithRoleUser() {
        return this.http.get(this.baseUrl + 'user/role-user');
    }

}
