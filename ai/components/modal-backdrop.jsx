"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ModalBackDrop = () => {
  const router = useRouter();
  {
    /*back() when we want to execute back method, back when we want to point to back method  */
  }

  return <div className="modal-backdrop" onClick={router.back} />;
};

export default ModalBackDrop;
