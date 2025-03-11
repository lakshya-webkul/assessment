import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (!user) {
      router.navigate(['/']);
      return false;
    }
    return true;
  }
  return false;
};
