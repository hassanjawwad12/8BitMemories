import { Museum } from "@/components/Museum";

/**
 * The lobby — the museum IS the site root (/). Everything is client-rendered
 * inside <Museum/> (a freeform desktop with drag, audio, and live motion), so
 * this server component is just the mount point.
 */
export default function Home() {
  return <Museum />;
}
