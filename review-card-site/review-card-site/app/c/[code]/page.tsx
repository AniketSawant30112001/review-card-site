import { supabase, Business } from "../../../lib/supabaseClient";
import { notFound } from "next/navigation";

// Revalidate so a link you edit in Supabase shows up within a minute,
// without needing to redeploy the site.
export const revalidate = 60;

async function getBusiness(code: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("code", code.toUpperCase())
    .maybeSingle();

  if (error || !data) return null;
  return data as Business;
}

export default async function CardPage({
  params,
}: {
  params: { code: string };
}) {
  const business = await getBusiness(params.code);

  if (!business) {
    notFound();
  }

  const { name, google_url, instagram_url, whatsapp_url } = business!;

  return (
    <main className="screen">
      <h1 className="bizName">{name || "Thanks for stopping by"}</h1>
      <p className="bizSub">We'd love to stay connected</p>

      {google_url && (
        <a
          className="linkBtn review"
          href={google_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StarIcon />
          Leave a Google review
        </a>
      )}

      {instagram_url && (
        <a
          className="linkBtn insta"
          href={instagram_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstaIcon />
          Follow on Instagram
        </a>
      )}

      {whatsapp_url && (
        <a
          className="linkBtn whatsapp"
          href={whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>
      )}

      {!google_url && !instagram_url && !whatsapp_url && (
        <p className="noLinks">This card isn't set up yet.</p>
      )}
    </main>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L6 21l1.6-7L2.2 9.2l7.1-.6z" />
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm5.6 14.3c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-3.3-.7-2.8-1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.8 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.6.8 1.9.9.3.1.5.2.6.3.1.2.1.8-.1 1.4z" />
    </svg>
  );
}
