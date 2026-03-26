import "server-only";

import { cache } from "react";
import { z } from "zod";

const serverEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.email(),
  LEAD_NOTIFICATION_EMAIL: z.email(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const getEnv = cache(() => serverEnvSchema.parse(process.env));
