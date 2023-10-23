import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage({ searchParams }: Props) {
  return (
    <div>
      <LoginForm returnTo={searchParams.returnTo} />
    </div>
  );
}
