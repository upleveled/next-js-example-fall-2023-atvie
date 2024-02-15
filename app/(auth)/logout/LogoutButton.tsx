import React from 'react';
import { logout } from './actions';
import styles from './LogoutButton.module.scss';

export default function LogoutButton() {
  return (
    <form>
      <button formAction={logout} className={styles.logoutButton}>
        Logout
      </button>
    </form>
  );
}
