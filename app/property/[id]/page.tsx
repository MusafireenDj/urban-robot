import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Bed, Bath, Ruler, DollarSign, Calendar, ChevronLeft, Heart, Star, Phone, Mail } from 'lucide-react';
import { SITE_NAME, PROPERTIES_PATH } from '@/lib/settings';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft or sqm
  location: string;
  images: string[];
  type: 'apartment' | 'house' | 'land' | 'commercial';
  availability: 'for_rent' | 'for_sale';
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Ocean View',
    description: 'Experience unparalleled luxury in this stunning villa with breathtaking ocean views. Perfect for families or those seeking a tranquil retreat.',
    price: 750000,
    bedrooms: 5,
    bathrooms: 4,
    area: 4000,
    location: 'Arta Beach, Djibouti',
    images: ['/placeholder.svg?height=600&width=800&text=Luxury+Villa'],
    type: 'house',
    availability: 'for_sale',
    contactName: 'John Doe',
    contactPhone: '+253 77 123 456',
    contactEmail: 'john.doe@example.com',
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious apartment in the heart of the city with stunning sea views. Features modern amenities and close proximity to business districts.',
    price: 1200, // per month
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    location: 'City Center, Djibouti',
    images: [
      '/placeholder.svg?height=400&width=600&text=Apartment View',
      '/placeholder.svg?height=400&width=600&text=Apartment Kitchen',
      '/placeholder.svg?height=400&width=600&text=Apartment Bedroom',
    ],
    type: 'apartment',
    availability: 'for_rent',
    contactName: 'Jane Smith',
    contactPhone: '+253 77 654 321',
    contactEmail: 'jane.smith@example.com',
    postedDate: '2023-09-15',
  },
  {
    id: '3',
    title: 'Commercial Office Space',
    description: 'Prime office space available for rent in a bustling commercial area. Ideal for startups or small businesses.',
    price: 3000, // per month
    bedrooms: 0,
    bathrooms: 1,
    area: 1500,
    location: 'Port Area, Djibouti',
    images: [
      '/placeholder.svg?height=400&width=600&text=Office Exterior',
      '/placeholder.svg?height=400&width=600&text=Office Interior',
    ],
    type: 'commercial',
    availability: 'for_rent',
    contactName: 'Mike Johnson',
    contactPhone: '+253 77 987 654',
    contactEmail: 'mike.johnson@example.com',
    postedDate: '2023-10-10',
  },
];

async function getProperty(id: string): Promise<Property | null> {
  // Simulate API call or database fetch
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProperties.find(p => p.id === id) || null;
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-card border-b">
        <Link href="/" className="flex items-center justify-center font-bold" prefetch={false}>
          <MapPin className="h-6 w-6 text-primary" />
          <span className="sr-only">{SITE_NAME}</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href={PROPERTIES_PATH} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Properties
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href={PROPERTIES_PATH} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary" prefetch={false}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Properties
          </Link>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Property image ${index + 1}`}
                      width={1200}
                      height={600}
                      className="w-full h-[300px] md:h-[500px] object-cover"
                      style={{ aspectRatio: '1200 / 600', objectFit: 'cover' }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-bold">{property.title}</CardTitle>
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" /> {property.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">
                  {property.availability === 'for_rent' ? `$${property.price}/month` : `$${property.price}`}
                </p>
                <p className="text-sm text-muted-foreground capitalize">{property.availability.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <span>{property.area} sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Posted: {new Date(property.postedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>Type: {property.type}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="grid gap-4">
              <Button className="w-full py-3 text-lg">Contact Agent</Button>
              <Button variant="outline" className="w-full py-3 text-lg">Schedule a Visit</Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {property.contactPhone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {property.contactEmail}
              </div>
            </div>
            <Link href={PROPERTIES_PATH} prefetch={false}>
              <Button>Back to Properties</Button>
            </Link>
          </CardFooter>
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
