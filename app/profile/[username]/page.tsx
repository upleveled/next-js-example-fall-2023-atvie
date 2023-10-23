type Props = {
  params: { username: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>{params.username} Profile</h2>
    </div>
  );
}
