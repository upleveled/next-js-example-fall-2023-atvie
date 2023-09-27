'use client';

import { useState } from 'react';
import { createCookie } from './actions';

export default function SetCookieForm() {
  const [cookieValue, setCookieValue] = useState('');

  return (
    // WARNING: in order to use Server Action you need to update the next.js config with serverActions = true
    // When using Server Actions we don't need prevent the default of the form
    <form>
      <input
        value={cookieValue}
        onChange={(event) => setCookieValue(event.currentTarget.value)}
      />
      {/* Instead of using onClick we use formAction */}
      <button formAction={async () => await createCookie(cookieValue)}>
        Set Cookie
      </button>
    </form>
  );
}
