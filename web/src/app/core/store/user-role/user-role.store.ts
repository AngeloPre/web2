import { Token } from '@/app/model/token';
import { inject, computed } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface Role {
  id: number;
  name: string;
}

const STORAGE_KEY = 'role';

export interface RoleState {
  role: Role | null;
}

function isRole(value: unknown): value is Role {
  return (
    !!value &&
    typeof (value as any).id === 'number' &&
    typeof (value as any).name === 'string'
  );
}

function loadRole(): Role | null {
  const storedJson = sessionStorage.getItem(STORAGE_KEY);
  if (!storedJson) return null;
  try {
    const parsedRole = JSON.parse(storedJson);
    return isRole(parsedRole) ? parsedRole : null;
  } catch {
    return null;
  }
}

function saveRole(role: Role) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(role));
}

function removeRole() {
  sessionStorage.removeItem(STORAGE_KEY);
}

function writeRoleToStorage(role: Role) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(role));
}

const initialState: RoleState = {
  role: loadRole(),
};

export const UserRole = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ role }) => ({
    isEmployee: computed(() => role()?.name === 'employee'),
    isClient: computed(() => role()?.name === 'client'),
    dashboardPath: computed(() => {
      const currentRole = role();
      if (!currentRole) return '/login';
      return currentRole.name === 'employee' ? '/funcionario' : '/cliente';
    }),
  })),

  withMethods((store) => ({
    updateRoleFromToken(token: string): void {
      const tokenRole = mapTokenRoleToRole(token);

      if (tokenRole) {
        patchState(store, { role: tokenRole });
        saveRole(tokenRole);
      }
    },

    logoutUser(): void {
      patchState(store, { role: null });
      removeRole();
    },
  }))
);

export function mapTokenRoleToRole(tokenRole: string): Role | null {
  switch (tokenRole.toUpperCase()) {
    case 'FUNCIONARIO':
      return { id: 1, name: 'employee' };
    case 'CLIENTE':
      return { id: 2, name: 'client' };
    default:
      return null;
  }
}
