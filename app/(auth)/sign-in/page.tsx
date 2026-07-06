import { FooterLink } from '@/components/FooterLink';

export default function SignInPage() {
  return (
    <div>
      <h1 className="form-title">Sign in</h1>
      <p className="mb-8 text-gray-500">
        Auth form components will be added with shadcn/ui in the next commit.
      </p>
      <FooterLink
        text="Don't have an account?"
        linkText="Sign up"
        href="/sign-up"
      />
    </div>
  );
}
