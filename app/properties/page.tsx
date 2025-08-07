import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Bed, Bath, Ruler, Search, DollarSign } from 'lucide-react';
import { SITE_NAME, HOME_PATH, ABOUT_PATH, CONTACT_PATH, LOGIN_PATH, PROPERTIES_PATH } from '@/lib/settings';
import { Label } from '@/components/ui/label';

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
}

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Spacious Family Villa',
    description: 'A beautiful villa with a large garden, perfect for families.',
    price: 250000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    location: 'Balbala, Djibouti',
    images: ['/placeholder.svg?height=200&width=300&text=Villa'],
    type: 'house',
    availability: 'for_sale',
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious apartment in the heart of the city with stunning sea views.',
    price: 1200, // per month
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    location: 'City Center, Djibouti',
    images: ['/placeholder.svg?height=200&width=300&text=Apartment'],
    type: 'apartment',
    availability: 'for_rent',
  },
  {
    id: '3',
    title: 'Commercial Office Space',
    description: 'Prime office space available for rent in a bustling commercial area.',
    price: 3000, // per month
    bedrooms: 0,
    bathrooms: 1,
    area: 1500,
    location: 'Port Area, Djibouti',
    images: ['/placeholder.svg?height=200&width=300&text=Office'],
    type: 'commercial',
    availability: 'for_rent',
  },
  {
    id: '4',
    title: 'Beachfront Land Plot',
    description: 'Ideal for developing a resort or luxury villa. Direct access to the beach.',
    price: 500000,
    bedrooms: 0,
    bathrooms: 0,
    area: 10000,
    location: 'Arta Beach, Djibouti',
    images: ['/placeholder.svg?height=200&width=300&text=Land'],
    type: 'land',
    availability: 'for_sale',
  },
  {
    id: '5',
    title: 'Cozy Studio for Rent',
    description: 'Affordable and compact studio apartment, perfect for singles or students.',
    price: 500, // per month
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    location: 'Ambouli, Djibouti',
    images: ['/placeholder.svg?height=200&width=300&text=Studio'],
    type: 'apartment',
    availability: 'for_rent',
  },
];

async function getProperties(filters: any): Promise<Property[]> {
  // Simulate API call or database fetch with filters
  await new Promise(resolve => setTimeout(resolve, 1000));
  let filteredProperties = mockProperties;

  if (filters.location) {
    filteredProperties = filteredProperties.filter(p =>
      p.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  if (filters.type && filters.type !== 'all') {
    filteredProperties = filteredProperties.filter(p => p.type === filters.type);
  }
  if (filters.availability && filters.availability !== 'all') {
    filteredProperties = filteredProperties.filter(p => p.availability === filters.availability);
  }
  // Add more filter logic as needed (e.g., price range, bedrooms, bathrooms)

  return filteredProperties;
}

export default async function PropertiesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const properties = await getProperties(searchParams);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-card border-b">
        <Link href={HOME_PATH} className="flex items-center justify-center" prefetch={false}>
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Properties</h1>
          <p className="text-muted-foreground mt-2 max-w-[600px] mx-auto">
            Explore a diverse range of properties available for rent and sale in Djibouti.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g., Balbala" defaultValue={searchParams.location as string || ''} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Property Type</Label>
              <Select name="type" defaultValue={searchParams.type as string || 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="availability">Availability</Label>
              <Select name="availability" defaultValue={searchParams.availability as string || 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="for_rent">For Rent</SelectItem>
                  <SelectItem value="for_sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full md:col-span-1">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No properties found matching your criteria.
            </div>
          ) : (
            properties.map((property) => (
              <Card key={property.id} className="flex flex-col overflow-hidden">
                <Link href={`/property/${property.id}`} prefetch={false}>
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    style={{ aspectRatio: '400 / 250', objectFit: 'cover' }}
                  />
                </Link>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-2xl font-bold text-primary mb-2">
                    {property.availability === 'for_rent' ? `$${property.price}/month` : `$${property.price}`}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" /> {property.bedrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" /> {property.bathrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" /> {property.area} sqft
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {property.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/property/${property.id}`} className="w-full" prefetch={false}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
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
