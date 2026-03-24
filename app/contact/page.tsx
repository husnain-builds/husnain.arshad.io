import { Container } from "@/components/Container";
import { ContactForm } from "@/app/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="py-12">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">
          This form saves messages into Strapi (collection:{" "}
          <code className="font-mono">contact-messages</code>).
        </p>
        <ContactForm />
      </Container>
    </main>
  );
}

