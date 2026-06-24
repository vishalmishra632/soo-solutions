import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal Cloudflare adapter config. No R2 incremental cache binding yet — the site is almost entirely
// static/SSG with one Server Action (the quote form), so the default in-memory cache is fine. Add an
// r2IncrementalCache override here if heavy ISR/revalidation is introduced later.
export default defineCloudflareConfig({});
