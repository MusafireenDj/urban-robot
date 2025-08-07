import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, HomeIcon, Search, DollarSign, Users, ShieldCheck } from 'lucide-react';
import { SITE_NAME, SITE_DESCRIPTION, PROPERTIES_PATH, ABOUT_PATH, CONTACT_PATH, LOGIN_PATH } from '@/lib/settings';

export default function HomePage() {
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Discover Your Dream Property in Djibouti
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                {SITE_DESCRIPTION}
              </p>
              <div className="space-x-4">
                <Link
                  href={PROPERTIES_PATH}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Browse Properties
                </Link>
                <Link
                  href={CONTACT_PATH}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                  Featured Properties
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore Our Listings</h2>
                <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From cozy apartments to spacious villas, find the perfect property to suit your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Modern Apartment</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    width="300"
                    height="200"
                    alt="Property 1"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Spacious 2-bedroom apartment in the city center.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">$1,200/month</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Family Villa</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    width="300"
                    height="200"
                    alt="Property 2"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Luxurious 4-bedroom villa with a large garden.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">$3,500/month</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Commercial Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    width="300"
                    height="200"
                    alt="Property 3"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Prime commercial space suitable for offices or retail.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">$2,000/month</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
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
