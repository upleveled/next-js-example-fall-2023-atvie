import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button formAction={logout}>Logout </button>
    </form>
  );
}
