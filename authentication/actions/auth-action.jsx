"use server";

import { hashUserPassword } from "@/lib/hash";
import { createUSer } from "@/lib/user";
import { redirect } from "next/navigation";

//next js will auto provide formData since its a server action after using it in a form
export async function SignUp(prevState, formData) {
  //"email" from name in form
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address ";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  //store it in db(Create a new user)
  const hashedPassword = hashUserPassword(password);
  try {
    createUSer(email, hashedPassword);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "It seems like an account fir the choosen email already exists",
        },
      };
    }
    throw error;
  }
  redirect('/training')
}
