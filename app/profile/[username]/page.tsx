import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByUsername } from '../../../database/users';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  //  Query your database to check if this user has the right access to this page
  // 3. If the user is not registered, redirect to register with returnTo
  const user = await getUserByUsername(params.username);

  if (!user) redirect(`/register?returnTo=/profile/${params.username}`);

  // 4. If the is registered already but the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) redirect(`/login?returnTo=/profile/${params.username}`);

  return (
    <div>
      <h2>{params.username} Profile</h2>
    </div>
  );
}
