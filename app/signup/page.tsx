import { MainLayout } from '@/components/layouts/MainLayout';
import { SignupForm } from '@/components/organisms/SignupForm';

export default function SignupPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Sign up to start browsing and purchasing premium assets
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </MainLayout>
  );
}

