import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '../../database/users';

export default async function UserProfilePage() {
  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login?returnTo=/profile`);
  }

  // 4. If user exists, render the page
  return (
    <div>
      <h2>{user.username}'s Profile</h2>
    </div>
  );
}
