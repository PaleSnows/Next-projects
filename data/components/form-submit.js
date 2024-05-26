"use client";
import { useFormStatus } from "react-dom";

const FormSubmit = () => {
  // gives a status obj that has info about the submission status of a form
  const status = useFormStatus();
  console.log(status);
  if (status.pending) {
    return <p>Creating posts...</p>;
  }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};

export default FormSubmit;
