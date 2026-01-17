import { z } from "zod";
import { isAddress } from "viem";

export const sendEthSchema = z.object({
  to: z
    .string()
    .refine((val) => isAddress(val), {
      message: "Invalid Ethereum address",
    }),

 /*  amount: z
    .string()
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0",
    }), */
});
