"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("8d5c8b8c-e75e-4d2b-800a-2c6900fe24e4");
  }, []);

  return null;
};
