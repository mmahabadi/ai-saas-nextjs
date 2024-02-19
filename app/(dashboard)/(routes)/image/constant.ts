import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    label: "1 Photo",
    value: "1",
  },
  {
    label: "2 Photos",
    value: "2",
  },
  {
    label: "3 Photos",
    value: "3",
  },
  {
    label: "4 Photos",
    value: "4",
  },
  {
    label: "5 Photos",
    value: "5",
  },
];
export const resolutionOptions = [
  {
    label: "1024x1024",
    value: "1024x1024",
  },
  {
    label: "1792x1024",
    value: "1792x1024",
  },
  {
    label: "1024x1792",
    value: "1024x1792",
  },
];
