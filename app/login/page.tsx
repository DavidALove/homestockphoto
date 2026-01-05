import { MainLayout } from '@/components/layouts/MainLayout';
import { LoginForm } from '@/components/organisms/LoginForm';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Sign In</h1>
            <p className="text-muted-foreground">
              Welcome back! Sign in to your account to continue.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
}

