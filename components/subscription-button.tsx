"use client";

import { Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}
export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe");
      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 fill-white ml-2" />}
    </Button>
  );
};
