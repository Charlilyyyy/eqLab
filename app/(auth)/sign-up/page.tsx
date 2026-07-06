import { FooterLink } from '@/components/FooterLink';

export default function SignUpPage() {
  return (
    <div>
      <h1 className="form-title">Create account</h1>
      <p className="mb-8 text-gray-500">
        Registration form components will be added with shadcn/ui in the next
        commit.
      </p>
      <FooterLink
        text="Already have an account?"
        linkText="Sign in"
        href="/sign-in"
      />
    </div>
  );
}
