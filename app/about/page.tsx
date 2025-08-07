import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, HomeIcon, Search, DollarSign, Users, ShieldCheck } from 'lucide-react';
import { SITE_NAME, SITE_DESCRIPTION, PROPERTIES_PATH, ABOUT_PATH, CONTACT_PATH, LOGIN_PATH } from '@/lib/settings';
import Link from 'next/link';

export default function AboutPage() {
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
            <CardTitle className="text-2xl font-bold">About Us</CardTitle>
            <CardDescription>Learn more about our company and our mission.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              MusafireenDj is your premier destination for finding the perfect property in Djibouti. We offer a wide range of listings, from apartments and houses to commercial spaces and land plots.
            </p>
            <p>
              Our mission is to provide a seamless and transparent real estate experience, connecting buyers, sellers, and renters with the best opportunities in the market.
            </p>
            <p>
              With years of experience and a deep understanding of the local market, we are committed to helping you achieve your real estate goals.
            </p>
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
