// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user: { email: string, role: string } | null = null;

    // Méthode pour définir l'utilisateur connecté
    setUser(email: string, role: string): void {
        this.user = { email, role };
        // Vous pouvez aussi stocker ces informations dans le localStorage pour persistance
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    // Récupère l'utilisateur connecté
    getUser(): { email: string, role: string } | null {
        if (!this.user) {
            const stored = localStorage.getItem('user');
            if (stored) {
                this.user = JSON.parse(stored);
            }
        }
        return this.user;
    }
    // getUserRole(): string | null {
    //     return this.getUser()?.role || null;
    // }

    getUserRole(): string | null {
        if (!this.user) {
            const stored = localStorage.getItem('user');
            if (stored) {
                this.user = JSON.parse(stored);
            }
        }
        return this.user ? this.user.role : null;
    }

    // Méthode pour effacer l'utilisateur (déconnexion)
    logout(): void {
        this.user = null;
        localStorage.removeItem('user');
    }

    // Vérifie si un utilisateur est connecté
    isAuthenticated(): boolean {
        return this.getUser() !== null;
    }

    // Retourne le rôle de l'utilisateur

}
