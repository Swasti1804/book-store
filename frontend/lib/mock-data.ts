export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: number
  joinedDate: string
  stats: {
    booksListed: number
    booksShared: number
    totalDonations: number
    impactScore: number
    currentStreak: number
    level: string
    totalViews: number
    totalMessages: number
    communityRank: number
    booksRead: number
    readingGoal: number
  }
}

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  condition: "New" | "Like New" | "Good" | "Fair"
  description: string
  imageUrl: string
  location: {
    address: string
    coordinates: [number, number]
  }
  owner: {
    id: string
    name: string
    avatar: string
    rating: number
    totalBooks: number
  }
  availability: "Available" | "Reserved" | "Exchanged"
  postedDate: string
  tags: string[]
  isbn?: string
  language: string
  pages?: number
  publisher?: string
  yearPublished?: number
}

export const mockCurrentUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  avatar: 1,
  joinedDate: "2023-06-15",
  stats: {
    booksListed: 24,
    booksShared: 18,
    totalDonations: 12,
    impactScore: 1250,
    currentStreak: 15,
    level: "Book Champion",
    totalViews: 342,
    totalMessages: 89,
    communityRank: 47,
    booksRead: 46,
    readingGoal: 60,
  },
}

export const mockBooks: Book[] = [
  {
    id: "book-1",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    condition: "Like New",
    description:
      "A beautiful exploration of life's infinite possibilities. This book changed my perspective on regret and second chances.",
    imageUrl: "/placeholder.svg?height=300&width=200&text=The+Midnight+Library",
    location: {
      address: "Downtown Library District, Seattle, WA",
      coordinates: [-122.3321, 47.6062],
    },
    owner: {
      id: "user-2",
      name: "Sarah Chen",
      avatar: "SC",
      rating: 4.8,
      totalBooks: 32,
    },
    availability: "Available",
    postedDate: "2024-01-15",
    tags: ["philosophical", "thought-provoking", "bestseller"],
    isbn: "9781786892737",
    language: "English",
    pages: 288,
    publisher: "Canongate Books",
    yearPublished: 2020,
  },
  {
    id: "book-2",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    condition: "Good",
    description:
      "Practical guide to building good habits and breaking bad ones. Lots of highlighting and notes included!",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Atomic+Habits",
    location: {
      address: "Capitol Hill, Seattle, WA",
      coordinates: [-122.3207, 47.6205],
    },
    owner: {
      id: "user-3",
      name: "Mike Rodriguez",
      avatar: "MR",
      rating: 4.9,
      totalBooks: 18,
    },
    availability: "Available",
    postedDate: "2024-01-12",
    tags: ["productivity", "self-improvement", "habits"],
    isbn: "9780735211292",
    language: "English",
    pages: 320,
    publisher: "Avery",
    yearPublished: 2018,
  },
  {
    id: "book-3",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Historical Fiction",
    condition: "New",
    description: "Captivating story about a reclusive Hollywood icon. Couldn't put it down!",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Evelyn+Hugo",
    location: {
      address: "Fremont, Seattle, WA",
      coordinates: [-122.3493, 47.6517],
    },
    owner: {
      id: "user-4",
      name: "Emma Thompson",
      avatar: "ET",
      rating: 4.7,
      totalBooks: 45,
    },
    availability: "Reserved",
    postedDate: "2024-01-10",
    tags: ["hollywood", "lgbtq", "drama"],
    isbn: "9781501161933",
    language: "English",
    pages: 400,
    publisher: "Atria Books",
    yearPublished: 2017,
  },
  {
    id: "book-4",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    condition: "Fair",
    description: "Classic sci-fi epic. Some wear on the cover but all pages intact. Perfect for a first read!",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Dune",
    location: {
      address: "Ballard, Seattle, WA",
      coordinates: [-122.3817, 47.6677],
    },
    owner: {
      id: "user-5",
      name: "David Kim",
      avatar: "DK",
      rating: 4.6,
      totalBooks: 67,
    },
    availability: "Available",
    postedDate: "2024-01-08",
    tags: ["space-opera", "classic", "adventure"],
    isbn: "9780441172719",
    language: "English",
    pages: 688,
    publisher: "Ace",
    yearPublished: 1965,
  },
  {
    id: "book-5",
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    condition: "Like New",
    description: "Powerful memoir about education and family. Includes discussion questions for book clubs.",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Educated",
    location: {
      address: "Queen Anne, Seattle, WA",
      coordinates: [-122.3564, 47.6374],
    },
    owner: {
      id: "user-6",
      name: "Lisa Park",
      avatar: "LP",
      rating: 4.9,
      totalBooks: 29,
    },
    availability: "Available",
    postedDate: "2024-01-05",
    tags: ["memoir", "education", "family"],
    isbn: "9780399590504",
    language: "English",
    pages: 334,
    publisher: "Random House",
    yearPublished: 2018,
  },
  {
    id: "book-6",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    condition: "Good",
    description: "Gripping psychological thriller. Perfect condition except for a small coffee stain on page 45.",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Silent+Patient",
    location: {
      address: "Wallingford, Seattle, WA",
      coordinates: [-122.3341, 47.6606],
    },
    owner: {
      id: "user-7",
      name: "Rachel Green",
      avatar: "RG",
      rating: 4.8,
      totalBooks: 23,
    },
    availability: "Available",
    postedDate: "2024-01-03",
    tags: ["psychological", "mystery", "twist-ending"],
    isbn: "9781250301697",
    language: "English",
    pages: 336,
    publisher: "Celadon Books",
    yearPublished: 2019,
  },
]

export const mockUserBooks: Book[] = [
  {
    id: "user-book-1",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Technology",
    condition: "Good",
    description: "Essential reading for any programmer. Well-maintained with some highlighting in key sections.",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Clean+Code",
    location: {
      address: "Your Location",
      coordinates: [-122.3321, 47.6062],
    },
    owner: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "AJ",
      rating: 4.9,
      totalBooks: 24,
    },
    availability: "Available",
    postedDate: "2024-01-20",
    tags: ["programming", "software-development", "best-practices"],
    isbn: "9780132350884",
    language: "English",
    pages: 464,
    publisher: "Prentice Hall",
    yearPublished: 2008,
  },
  {
    id: "user-book-2",
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    genre: "Technology",
    condition: "Like New",
    description: "Timeless advice for software developers. Barely used, excellent condition.",
    imageUrl: "/placeholder.svg?height=300&width=200&text=Pragmatic+Programmer",
    location: {
      address: "Your Location",
      coordinates: [-122.3321, 47.6062],
    },
    owner: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "AJ",
      rating: 4.9,
      totalBooks: 24,
    },
    availability: "Reserved",
    postedDate: "2024-01-18",
    tags: ["programming", "career-development", "methodology"],
    isbn: "9780135957059",
    language: "English",
    pages: 352,
    publisher: "Addison-Wesley",
    yearPublished: 2019,
  },
]
