import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, HomeIcon, Search, DollarSign, Users, ShieldCheck, Phone, Mail } from 'lucide-react';
import { SITE_NAME, SITE_DESCRIPTION, PROPERTIES_PATH, ABOUT_PATH, CONTACT_PATH, LOGIN_PATH } from '@/lib/settings';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-card border-b">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <MapPin className="h-6 w-6 text-primary" />
          <span className="sr-only">{SITE_NAME}</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href={PROPERTIES_PATH} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Properties
          </Link>
          <Link href={ABOUT_PATH} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href={CONTACT_PATH} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Link href={LOGIN_PATH} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Card className="overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
            <CardDescription>We'd love to hear from you!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              Have questions or need assistance? Reach out to us using the contact information below or send us a message through the form.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Djibouti City, Djibouti</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+253 77 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>info@musafireendj.com</span>
              </div>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Your email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={4} />
              </div>
              <Button>Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card text-card-foreground">
        <p className="text-xs text-muted-foreground">&copy; 2024 {SITE_NAME}. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
