// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRole = route.data['expectedRole']; // Role attendu défini dans les données de la route
        const currentRole = this.authService.getUserRole();

        // Si expectedRole est un tableau, vérifier que currentRole y est présent
        if (Array.isArray(expectedRole)) {
            if (!expectedRole.includes(currentRole)) {
                this.router.navigate(['/unauthorized']);
                return false;
            }
        } else if (currentRole !== expectedRole) {
            this.router.navigate(['/unauthorized']);
            return false;
        }
        return true;
    }
}
