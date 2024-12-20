import { ClientPageWrapper } from "@/components/ui/ClientPageWrapper";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <ClientPageWrapper>
      <div className="pt-8">
        <ContactForm />
      </div>
    </ClientPageWrapper>
  );
} 