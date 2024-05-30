"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SignUp } from "@/actions/auth-action";

export default function AuthForm() {
  // It returns an array where the first element (formState) is the state of the form, and the second element (formAction) is the function to handle the form submission.
  const [formState, formAction] = useFormState(SignUp, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <p>
        {formState.errors && (
          <ul id="form-errors">
            {/* Object.keys convert converts list of keys int array */}
            {Object.keys(formState.errors).map((error) => (
              <li key={error}>{formState.errors[error]}</li>
            ))}
          </ul>
        )}
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
