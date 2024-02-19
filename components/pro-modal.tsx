"use client";

import { routes } from "@/app/routes";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/app/hooks/use-pro-modal";
import { Route } from "@/types";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";

const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Robo
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {routes
              .filter((item) => !item.hideOnDashboard)
              .map((item: Route) => (
                <Card
                  key={item.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", item.bgColor)}>
                      <item.icon className={cn("w-6 h-6", item.color)} />
                    </div>
                    <div className="font-semibold text-sm">{item.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="lg" variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProModal;
