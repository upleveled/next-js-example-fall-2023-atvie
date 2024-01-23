import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserForProfile } from '../../../database/users';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  // Task: Add redirect to home if user is logged in
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. If there is no sessionToken cookie, redirect to login
  if (!sessionTokenCookie) {
    redirect(`/login?returnTo=/profile/${params.username}`);
  }

  // 3. Query the user that owns the profile
  const userForProfile = await getUserForProfile(
    sessionTokenCookie.value,
    params.username,
  );

  // 4. Access denied to users that are not the owner of the profile
  if (!userForProfile) return <div>Access denied</div>;

  return (
    <div>
      <h2>{userForProfile.username}'s Profile</h2>
    </div>
  );
}
