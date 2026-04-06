import { DemoEmbedClient } from "@/components/content/demo-embed-client";
import type { DemoRole } from "@/components/content/role-switcher";

export function DemoEmbed({
  variant,
  title,
  description,
  initialRole = "admin",
  chrome = "default",
  className,
}: {
  variant: "home" | "page";
  title?: string;
  description?: string;
  initialRole?: DemoRole;
  chrome?: "default" | "hero";
  className?: string;
}) {
  return (
    <DemoEmbedClient
      variant={variant}
      title={title}
      description={description}
      initialRole={initialRole}
      chrome={chrome}
      className={className}
    />
  );
}
