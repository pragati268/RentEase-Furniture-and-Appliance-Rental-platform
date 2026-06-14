import mongoose from "mongoose";
import connectDB from "./config/db.js";
import productModel from "./models/product-model.js";


const products = [
  // ===== FURNITURE - Sofas =====
  {
    name: "Modern 3 Seater Sofa",
    description: "Premium fabric sofa with comfortable cushions and wooden legs",
    price: 24999, pricePerDay: 80, pricePerMonth: 899, securityDeposit: 2000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc"],
    category: "Furniture", subCategory: "Sofas", stock: 5, city: "Delhi", featured: true, ratings: 4.5, numOfReviews: 21,
    material: "Premium Fabric", color: "Grey", dimensions: "200 x 85 x 75 cm", brand: "Urban Ladder", weight: "35 kg"
  },
  {
    name: "L-Shaped Sectional Sofa",
    description: "Spacious L-shaped sofa perfect for family rooms",
    price: 45999, pricePerDay: 150, pricePerMonth: 1599, securityDeposit: 4000,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
    images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e"],
    category: "Furniture", subCategory: "Sofas", stock: 3, city: "Mumbai", ratings: 4.2, numOfReviews: 15,
    material: "Linen Fabric", color: "Beige", dimensions: "260 x 160 x 85 cm", brand: "IKEA", weight: "55 kg"
  },
  {
    name: "Compact 2 Seater Sofa",
    description: "Space-saving 2 seater for small apartments",
    price: 15999, pricePerDay: 50, pricePerMonth: 599, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1558583055-b74e7a1fc6a8",
    images: ["https://images.unsplash.com/photo-1558583055-b74e7a1fc6a8"],
    category: "Furniture", subCategory: "Sofas", stock: 8, city: "Bangalore", ratings: 4.0, numOfReviews: 10,
    material: "Polyester Fabric", color: "Blue", dimensions: "140 x 80 x 72 cm", brand: "Pepperfry", weight: "22 kg"
  },

  // ===== FURNITURE - Beds =====
  {
    name: "Queen Size Bed",
    description: "Elegant queen size bed with storage",
    price: 32999, pricePerDay: 110, pricePerMonth: 1199, securityDeposit: 3000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"],
    category: "Furniture", subCategory: "Beds", stock: 5, city: "Mumbai", featured: true, ratings: 4.7, numOfReviews: 30,
    material: "Engineered Wood", color: "Walnut Finish", dimensions: "210 x 180 x 90 cm", brand: "Wakefit", weight: "65 kg"
  },
  {
    name: "King Size Bed with Hydraulic Storage",
    description: "Premium king size bed with hydraulic storage lift",
    price: 49999, pricePerDay: 160, pricePerMonth: 1799, securityDeposit: 4500,
    image: "https://images.unsplash.com/photo-1612645213559-6af1d4edeaf8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEtpbmclMjBTaXplJTIwQmVkJTIwd2l0aCUyMEh5ZHJhdWxpYyUyMFN0b3JhZ2V8ZW58MHx8MHx8fDA%3D",
    images: ["https://images.unsplash.com/photo-1616627547584-bf28cee262db"],
    category: "Furniture", subCategory: "Beds", stock: 2, city: "Delhi", featured: true, ratings: 4.8, numOfReviews: 18,
    material: "Solid Sheesham Wood", color: "Honey Finish", dimensions: "210 x 200 x 95 cm", brand: "Durian", weight: "85 kg"
  },
  {
    name: "Single Bed with Trundle",
    description: "Space-saving single bed with pull-out trundle",
    price: 18999, pricePerDay: 60, pricePerMonth: 699, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd"],
    category: "Furniture", subCategory: "Beds", stock: 0, city: "Pune", ratings: 3.9, numOfReviews: 8,
    material: "Engineered Wood", color: "White", dimensions: "200 x 100 x 85 cm", brand: "HomeTown", weight: "45 kg"
  },

  // ===== FURNITURE - Mattresses =====
  {
    name: "Orthopedic Queen Mattress",
    description: "Memory foam orthopedic mattress for spine support",
    price: 12999, pricePerDay: 40, pricePerMonth: 499, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304"],
    category: "Furniture", subCategory: "Mattresses", stock: 10, city: "Delhi", ratings: 4.3, numOfReviews: 25,
    material: "Memory Foam", color: "White", dimensions: "200 x 150 x 20 cm", brand: "Wakefit", weight: "18 kg"
  },
  {
    name: "Premium Pocket Spring Mattress",
    description: "Luxury pocket spring mattress with cooling gel layer",
    price: 19999, pricePerDay: 65, pricePerMonth: 749, securityDeposit: 2000,
    image: "https://images.unsplash.com/photo-1657524398377-567034729507",
    images: ["https://images.unsplash.com/photo-1657524398377-567034729507"],
    category: "Furniture", subCategory: "Mattresses", stock: 4, city: "Mumbai", ratings: 4.6, numOfReviews: 12,
    material: "Pocket Spring + Gel Foam", color: "White", dimensions: "200 x 180 x 25 cm", brand: "Sleepyhead", weight: "25 kg"
  },
  {
    name: "Foldable Mattress",
    description: "Portable foldable mattress for guests",
    price: 4999, pricePerDay: 15, pricePerMonth: 199, securityDeposit: 500,
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0",
    images: ["https://images.unsplash.com/photo-1532372576444-dda954194ad0"],
    category: "Furniture", subCategory: "Mattresses", stock: 0, city: "Bangalore", ratings: 3.5, numOfReviews: 6,
    material: "Polyurethane Foam", color: "Grey", dimensions: "190 x 90 x 10 cm", brand: "Sleepyhead", weight: "8 kg"
  },

  // ===== FURNITURE - Wardrobes =====
  {
    name: "4-Door Wardrobe",
    description: "Spacious 4-door wardrobe with mirror finish",
    price: 28999, pricePerDay: 95, pricePerMonth: 999, securityDeposit: 2500,
    image: "https://images.unsplash.com/photo-1597006335770-25b6a72c9c6f",
    images: ["https://images.unsplash.com/photo-1597006335770-25b6a72c9c6f"],
    category: "Furniture", subCategory: "Wardrobes", stock: 3, city: "Delhi", ratings: 4.4, numOfReviews: 14,
    material: "Engineered Wood", color: "White Gloss", dimensions: "180 x 55 x 210 cm", brand: "HomeTown", weight: "95 kg"
  },
  {
    name: "Sliding Door Wardrobe",
    description: "Modern sliding door wardrobe with premium finish",
    price: 35999, pricePerDay: 120, pricePerMonth: 1299, securityDeposit: 3000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e"],
    category: "Furniture", subCategory: "Wardrobes", stock: 2, city: "Mumbai", ratings: 4.1, numOfReviews: 9,
    material: "MDF with Laminate", color: "Wenge Finish", dimensions: "200 x 60 x 220 cm", brand: "Urban Ladder", weight: "110 kg"
  },

  // ===== FURNITURE - Chairs =====
  {
    name: "Ergonomic Office Chair",
    description: "Adjustable ergonomic chair with lumbar support",
    price: 8999, pricePerDay: 30, pricePerMonth: 349, securityDeposit: 800,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
    images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267"],
    category: "Furniture", subCategory: "Chairs", stock: 12, city: "Bangalore", ratings: 4.5, numOfReviews: 40,
    material: "Mesh + PU Leather", color: "Black", dimensions: "65 x 65 x 120 cm", brand: "Green Soul", weight: "14 kg"
  },
  {
    name: "Wooden Dining Chair (Set of 4)",
    description: "Sheesham wood dining chair set with cushioned seats",
    price: 15999, pricePerDay: 50, pricePerMonth: 599, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1524756615980-c4c5620a08f6",
    images: ["https://images.unsplash.com/photo-1524756615980-c4c5620a08f6"],
    category: "Furniture", subCategory: "Chairs", stock: 6, city: "Pune", ratings: 4.0, numOfReviews: 11,
    material: "Solid Sheesham Wood", color: "Honey Teak", dimensions: "50 x 45 x 95 cm (per chair)", brand: "Pepperfry", weight: "8 kg (each)"
  },
  {
    name: "Gaming Chair",
    description: "High-back gaming chair with adjustable armrests",
    price: 14999, pricePerDay: 50, pricePerMonth: 549, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1536922245975-24c7e9d1b5a3",
    images: ["https://images.unsplash.com/photo-1536922245975-24c7e9d1b5a3"],
    category: "Furniture", subCategory: "Chairs", stock: 0, city: "Delhi", ratings: 4.6, numOfReviews: 28,
    material: "PU Leather + Foam", color: "Red & Black", dimensions: "70 x 65 x 135 cm", brand: "Green Soul", weight: "22 kg"
  },

  // ===== FURNITURE - Study Tables =====
  {
    name: "Study Table",
    description: "Compact study table with drawer storage",
    price: 12999, pricePerDay: 40, pricePerMonth: 499, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1540574163-ae34e3bf2adf",
    images: ["https://images.unsplash.com/photo-1540574163-ae34e3bf2adf"],
    category: "Furniture", subCategory: "Study Tables", stock: 8, city: "Chandigarh", featured: true, ratings: 4.2, numOfReviews: 19,
    material: "Engineered Wood", color: "Wenge Finish", dimensions: "100 x 50 x 75 cm", brand: "Wakefit", weight: "28 kg"
  },
  {
    name: "L-Shaped Corner Study Desk",
    description: "Spacious L-shaped desk with monitor stand",
    price: 18999, pricePerDay: 60, pricePerMonth: 699, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c"],
    category: "Furniture", subCategory: "Study Tables", stock: 4, city: "Bangalore", ratings: 4.3, numOfReviews: 7,
    material: "Engineered Wood with Metal Legs", color: "White & Silver", dimensions: "140 x 140 x 75 cm", brand: "Urban Ladder", weight: "35 kg"
  },

  // ===== FURNITURE - Dining Tables =====
  {
    name: "Dining Table Set",
    description: "6-seater dining table with chairs",
    price: 27999, pricePerDay: 90, pricePerMonth: 999, securityDeposit: 2500,
    image: "https://images.unsplash.com/photo-1519944158858-f7a7c6c1d20c",
    images: ["https://images.unsplash.com/photo-1519944158858-f7a7c6c1d20c"],
    category: "Furniture", subCategory: "Dining Tables", stock: 0, city: "Pune", ratings: 4.1, numOfReviews: 16,
    material: "Solid Sheesham Wood", color: "Honey Teak", dimensions: "180 x 90 x 75 cm", brand: "Pepperfry", weight: "60 kg"
  },
  {
    name: "Compact 4-Seater Dining Table",
    description: "Space-saving dining table for small spaces",
    price: 15999, pricePerDay: 50, pricePerMonth: 599, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156",
    images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156"],
    category: "Furniture", subCategory: "Dining Tables", stock: 5, city: "Mumbai", ratings: 3.8, numOfReviews: 5,
    material: "Engineered Wood", color: "Rustic Brown", dimensions: "120 x 80 x 75 cm", brand: "HomeTown", weight: "32 kg"
  },
  {
    name: "Glass Top Dining Table",
    description: "Elegant glass top dining table with chrome legs",
    price: 21999, pricePerDay: 70, pricePerMonth: 799, securityDeposit: 2000,
    image: "https://images.unsplash.com/photo-1586023495315-4737e53b1a7a",
    images: ["https://images.unsplash.com/photo-1586023495315-4737e53b1a7a"],
    category: "Furniture", subCategory: "Dining Tables", stock: 3, city: "Delhi", ratings: 4.4, numOfReviews: 13,
    material: "Tempered Glass + Chrome", color: "Clear Glass", dimensions: "160 x 80 x 75 cm", brand: "IKEA", weight: "40 kg"
  },

  // ===== FURNITURE - Coffee Tables =====
  {
    name: "Round Coffee Table",
    description: "Modern round coffee table with tempered glass top",
    price: 7999, pricePerDay: 25, pricePerMonth: 299, securityDeposit: 700,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc",
    images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc"],
    category: "Furniture", subCategory: "Coffee Tables", stock: 7, city: "Delhi", ratings: 4.0, numOfReviews: 9,
    material: "Glass + Metal", color: "Black Frame", dimensions: "80 cm dia x 45 cm H", brand: "Pepperfry", weight: "15 kg"
  },
  {
    name: "Wooden Coffee Table with Storage",
    description: "Rustic wooden coffee table with shelf storage",
    price: 9999, pricePerDay: 35, pricePerMonth: 399, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
    images: ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078"],
    category: "Furniture", subCategory: "Coffee Tables", stock: 4, city: "Bangalore", ratings: 4.2, numOfReviews: 11,
    material: "Solid Acacia Wood", color: "Rustic Brown", dimensions: "110 x 55 x 40 cm", brand: "Urban Ladder", weight: "22 kg"
  },

  // ===== FURNITURE - TV Units =====
  {
    name: "Wall-Mounted TV Unit",
    description: "Sleek wall-mounted unit for TVs up to 55 inch",
    price: 11999, pricePerDay: 40, pricePerMonth: 449, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0",
    images: ["https://images.unsplash.com/photo-1532372576444-dda954194ad0"],
    category: "Furniture", subCategory: "TV Units", stock: 6, city: "Mumbai", ratings: 4.3, numOfReviews: 14,
    material: "Engineered Wood", color: "High Gloss White", dimensions: "150 x 35 x 40 cm", brand: "HomeTown", weight: "20 kg"
  },
  {
    name: "TV Entertainment Center",
    description: "Large entertainment center with storage cabinets",
    price: 18999, pricePerDay: 60, pricePerMonth: 699, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1564410083419-cb6d3c3a1b57",
    images: ["https://images.unsplash.com/photo-1564410083419-cb6d3c3a1b57"],
    category: "Furniture", subCategory: "TV Units", stock: 2, city: "Delhi", ratings: 4.1, numOfReviews: 8,
    material: "Engineered Wood with Laminate", color: "Wenge Finish", dimensions: "180 x 40 x 55 cm", brand: "Urban Ladder", weight: "45 kg"
  },

  // ===== FURNITURE - Bookshelves =====
  {
    name: "5-Tier Bookshelf",
    description: "Tall wooden bookshelf with 5 spacious shelves",
    price: 7999, pricePerDay: 25, pricePerMonth: 299, securityDeposit: 700,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"],
    category: "Furniture", subCategory: "Bookshelves", stock: 9, city: "Pune", ratings: 4.0, numOfReviews: 7,
    material: "Engineered Wood", color: "Rustic Brown", dimensions: "60 x 30 x 180 cm", brand: "Pepperfry", weight: "25 kg"
  },
  {
    name: "Corner Bookshelf",
    description: "Corner bookshelf that maximizes space utilization",
    price: 5999, pricePerDay: 20, pricePerMonth: 249, securityDeposit: 500,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
    images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5"],
    category: "Furniture", subCategory: "Bookshelves", stock: 0, city: "Chandigarh", ratings: 3.7, numOfReviews: 4,
    material: "Engineered Wood", color: "White", dimensions: "50 x 50 x 160 cm", brand: "HomeTown", weight: "18 kg"
  },

  // ===== FURNITURE - Drawers =====
  {
    name: "3-Drawer Chest",
    description: "Compact 3-drawer chest for bedroom storage",
    price: 6999, pricePerDay: 25, pricePerMonth: 279, securityDeposit: 600,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
    images: ["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1"],
    category: "Furniture", subCategory: "Drawers", stock: 5, city: "Delhi", ratings: 4.1, numOfReviews: 6,
    material: "Engineered Wood", color: "White", dimensions: "60 x 40 x 75 cm", brand: "Wakefit", weight: "22 kg"
  },
  {
    name: "5-Drawer Tallboy",
    description: "Tall 5-drawer chest for maximum storage",
    price: 9999, pricePerDay: 35, pricePerMonth: 399, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1585772724684-5f83f9646e10",
    images: ["https://images.unsplash.com/photo-1585772724684-5f83f9646e10"],
    category: "Furniture", subCategory: "Drawers", stock: 3, city: "Mumbai", ratings: 4.3, numOfReviews: 10,
    material: "Engineered Wood with Laminate", color: "Walnut Finish", dimensions: "50 x 40 x 120 cm", brand: "Urban Ladder", weight: "32 kg"
  },

  // ===== FURNITURE - Dressers =====
  {
    name: "Dressing Table with Mirror",
    description: "Elegant dressing table with large mirror and stool",
    price: 13999, pricePerDay: 45, pricePerMonth: 529, securityDeposit: 1200,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    category: "Furniture", subCategory: "Dressers", stock: 4, city: "Bangalore", ratings: 4.4, numOfReviews: 15,
    material: "Engineered Wood + Glass", color: "White & Silver", dimensions: "90 x 45 x 140 cm", brand: "Wakefit", weight: "30 kg"
  },
  {
    name: "LED Mirror Dressing Table",
    description: "Dressing table with LED-lit mirror and jewelry drawer",
    price: 17999, pricePerDay: 60, pricePerMonth: 699, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1583394292149-0d99e90f15c0",
    images: ["https://images.unsplash.com/photo-1583394292149-0d99e90f15c0"],
    category: "Furniture", subCategory: "Dressers", stock: 0, city: "Delhi", ratings: 4.6, numOfReviews: 22,
    material: "Engineered Wood + LED", color: "White Gloss", dimensions: "100 x 45 x 150 cm", brand: "HomeTown", weight: "35 kg"
  },

  // ===== FURNITURE - Side Tables =====
  {
    name: "Night Stand Side Table",
    description: "Compact night stand with drawer and open shelf",
    price: 3999, pricePerDay: 15, pricePerMonth: 169, securityDeposit: 400,
    image: "https://images.unsplash.com/photo-1570586437267-8b1c6c7a8f4e",
    images: ["https://images.unsplash.com/photo-1570586437267-8b1c6c7a8f4e"],
    category: "Furniture", subCategory: "Side Tables", stock: 10, city: "Pune", ratings: 3.9, numOfReviews: 8,
    material: "Engineered Wood", color: "Rustic Brown", dimensions: "40 x 35 x 55 cm", brand: "Pepperfry", weight: "10 kg"
  },
  {
    name: "C-Shape Side Table",
    description: "C-shape side table that slides over sofa/bed",
    price: 2999, pricePerDay: 10, pricePerMonth: 129, securityDeposit: 300,
    image: "https://images.unsplash.com/photo-1590001155090-915be0b39e1f",
    images: ["https://images.unsplash.com/photo-1590001155090-915be0b39e1f"],
    category: "Furniture", subCategory: "Side Tables", stock: 7, city: "Mumbai", ratings: 4.0, numOfReviews: 5,
    material: "Engineered Wood + Metal", color: "Black & Walnut", dimensions: "55 x 35 x 60 cm", brand: "Urban Ladder", weight: "8 kg"
  },

  // ===== FURNITURE - Recliners =====
  {
    name: "Single Seater Recliner",
    description: "Comfortable manual recliner with footrest",
    price: 18999, pricePerDay: 60, pricePerMonth: 699, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1560843083-2b8f5b8f5a1e",
    images: ["https://images.unsplash.com/photo-1560843083-2b8f5b8f5a1e"],
    category: "Furniture", subCategory: "Recliners", stock: 3, city: "Delhi", featured: true, ratings: 4.5, numOfReviews: 20,
    material: "PU Leather", color: "Brown", dimensions: "85 x 80 x 105 cm", brand: "HomeTown", weight: "30 kg"
  },
  {
    name: "Electric Massage Recliner",
    description: "Electric recliner with built-in massage and heat",
    price: 35999, pricePerDay: 120, pricePerMonth: 1299, securityDeposit: 3000,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b6",
    images: ["https://images.unsplash.com/photo-1549490349-8643362247b6"],
    category: "Furniture", subCategory: "Recliners", stock: 1, city: "Mumbai", ratings: 4.7, numOfReviews: 14,
    material: "Premium Fabric + Metal Frame", color: "Charcoal Grey", dimensions: "90 x 85 x 110 cm", brand: "Durian", weight: "45 kg"
  },
  {
    name: "Rocking Recliner Chair",
    description: "Rocking recliner chair for nursery or living room",
    price: 12999, pricePerDay: 40, pricePerMonth: 499, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1581290548485-3b0b5f1a2c4d",
    images: ["https://images.unsplash.com/photo-1581290548485-3b0b5f1a2c4d"],
    category: "Furniture", subCategory: "Recliners", stock: 0, city: "Bangalore", ratings: 4.2, numOfReviews: 9,
    material: "Fabric + Plywood", color: "Teal", dimensions: "75 x 80 x 100 cm", brand: "IKEA", weight: "18 kg"
  },

  // ===== APPLIANCES - TVs =====
  {
    name: "43 inch 4K Smart TV",
    description: "Ultra HD smart TV with built-in streaming apps",
    price: 32999, pricePerDay: 110, pricePerMonth: 1199, securityDeposit: 3000,
    image: "https://images.unsplash.com/photo-1567016431615-2b9ea2b1d6c0",
    images: ["https://images.unsplash.com/photo-1567016431615-2b9ea2b1d6c0"],
    category: "Appliance", subCategory: "TVs", stock: 6, city: "Delhi", featured: true, ratings: 4.3, numOfReviews: 35,
    material: "Metal + Plastic", color: "Black", dimensions: "96 x 56 x 8 cm", brand: "Sony", weight: "8.5 kg"
  },
  {
    name: "55 inch OLED TV",
    description: "Premium OLED TV with Dolby Vision and Atmos",
    price: 79999, pricePerDay: 260, pricePerMonth: 2999, securityDeposit: 7000,
    image: "https://images.unsplash.com/photo-1621600441010-5c4b3e4b5a1e",
    images: ["https://images.unsplash.com/photo-1621600441010-5c4b3e4b5a1e"],
    category: "Appliance", subCategory: "TVs", stock: 2, city: "Mumbai", ratings: 4.8, numOfReviews: 16,
    material: "Aluminum + Carbon Fiber", color: "Dark Silver", dimensions: "122 x 70 x 5 cm", brand: "LG", weight: "18 kg"
  },
  {
    name: "32 inch HD LED TV",
    description: "Affordable HD TV for bedroom or kitchen",
    price: 14999, pricePerDay: 50, pricePerMonth: 549, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1596470021172-82f2e36a8c1b",
    images: ["https://images.unsplash.com/photo-1596470021172-82f2e36a8c1b"],
    category: "Appliance", subCategory: "TVs", stock: 10, city: "Bangalore", ratings: 4.0, numOfReviews: 12,
    material: "Plastic", color: "Black", dimensions: "73 x 43 x 8 cm", brand: "Samsung", weight: "4.5 kg"
  },

  // ===== APPLIANCES - Refrigerators =====
  {
    name: "Single Door Refrigerator",
    description: "190L single door refrigerator with stabilizer-free operation",
    price: 15999, pricePerDay: 50, pricePerMonth: 599, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1573853070944-5b8f8b5a1e2c",
    images: ["https://images.unsplash.com/photo-1573853070944-5b8f8b5a1e2c"],
    category: "Appliance", subCategory: "Refrigerators", stock: 7, city: "Delhi", ratings: 4.2, numOfReviews: 28,
    material: "Metal Body + Plastic Interior", color: "Red", dimensions: "55 x 60 x 135 cm", brand: "Godrej", weight: "35 kg"
  },
  {
    name: "Double Door Refrigerator",
    description: "320L double door refrigerator with inverter technology",
    price: 32999, pricePerDay: 110, pricePerMonth: 1199, securityDeposit: 3000,
    image: "https://images.unsplash.com/photo-1591478251445-5b8f8a1e2c3d",
    images: ["https://images.unsplash.com/photo-1591478251445-5b8f8a1e2c3d"],
    category: "Appliance", subCategory: "Refrigerators", stock: 4, city: "Mumbai", featured: true, ratings: 4.5, numOfReviews: 22,
    material: "Stainless Steel + Plastic", color: "Silver", dimensions: "65 x 70 x 170 cm", brand: "Samsung", weight: "55 kg"
  },
  {
    name: "Side-by-Side Refrigerator",
    description: "580L side-by-side refrigerator with water dispenser",
    price: 59999, pricePerDay: 200, pricePerMonth: 2199, securityDeposit: 5000,
    image: "https://images.unsplash.com/photo-1565183992-5b7f2a1e3c4d",
    images: ["https://images.unsplash.com/photo-1565183992-5b7f2a1e3c4d"],
    category: "Appliance", subCategory: "Refrigerators", stock: 0, city: "Pune", ratings: 4.6, numOfReviews: 10,
    material: "Stainless Steel", color: "Platinum Silver", dimensions: "90 x 75 x 180 cm", brand: "LG", weight: "85 kg"
  },

  // ===== APPLIANCES - Washing Machines =====
  {
    name: "Front Load Washing Machine",
    description: "7kg front load with in-built heater and smart sensors",
    price: 27999, pricePerDay: 90, pricePerMonth: 999, securityDeposit: 2500,
    image: "https://images.unsplash.com/photo-1616594982-5b8f3a1e2c4d",
    images: ["https://images.unsplash.com/photo-1616594982-5b8f3a1e2c4d"],
    category: "Appliance", subCategory: "Washing Machines", stock: 5, city: "Delhi", ratings: 4.4, numOfReviews: 18,
    material: "Metal Body + Plastic Lid", color: "White", dimensions: "60 x 55 x 85 cm", brand: "Bosch", weight: "65 kg"
  },
  {
    name: "Top Load Washing Machine",
    description: "8kg top load with powerful wash programs",
    price: 19999, pricePerDay: 65, pricePerMonth: 749, securityDeposit: 2000,
    image: "https://images.unsplash.com/photo-1578496780911-5b8f4a1e2c3d",
    images: ["https://images.unsplash.com/photo-1578496780911-5b8f4a1e2c3d"],
    category: "Appliance", subCategory: "Washing Machines", stock: 8, city: "Bangalore", ratings: 4.1, numOfReviews: 14,
    material: "Metal Body + Plastic Controls", color: "Grey", dimensions: "55 x 60 x 95 cm", brand: "Samsung", weight: "32 kg"
  },
  {
    name: "Washer Dryer Combo",
    description: "10kg washer dryer with 15 drying programs",
    price: 49999, pricePerDay: 160, pricePerMonth: 1799, securityDeposit: 4500,
    image: "https://images.unsplash.com/photo-1600585154526-5b8f5a1e2c3d",
    images: ["https://images.unsplash.com/photo-1600585154526-5b8f5a1e2c3d"],
    category: "Appliance", subCategory: "Washing Machines", stock: 0, city: "Mumbai", ratings: 4.3, numOfReviews: 7,
    material: "Stainless Steel Drum + Metal Body", color: "White", dimensions: "65 x 60 x 90 cm", brand: "LG", weight: "75 kg"
  },

  // ===== APPLIANCES - Air Conditioners =====
  {
    name: "1.5 Ton Split AC",
    description: "Inverter split AC with 5-star energy rating",
    price: 34999, pricePerDay: 120, pricePerMonth: 1299, securityDeposit: 3000,
    image: "https://images.unsplash.com/photo-1618220179-5b8f6a1e2c3d",
    images: ["https://images.unsplash.com/photo-1618220179-5b8f6a1e2c3d"],
    category: "Appliance", subCategory: "Air Conditioners", stock: 8, city: "Delhi", featured: true, ratings: 4.6, numOfReviews: 42,
    material: "Metal + Plastic", color: "White", dimensions: "Indoor: 90 x 30 x 22 cm", brand: "Daikin", weight: "12 kg (indoor)"
  },
  {
    name: "2 Ton Split AC",
    description: "High-capacity AC for large rooms with smart features",
    price: 44999, pricePerDay: 150, pricePerMonth: 1599, securityDeposit: 4000,
    image: "https://images.unsplash.com/photo-1611535115-5b8f7a1e2c3d",
    images: ["https://images.unsplash.com/photo-1611535115-5b8f7a1e2c3d"],
    category: "Appliance", subCategory: "Air Conditioners", stock: 4, city: "Mumbai", ratings: 4.5, numOfReviews: 26,
    material: "Metal + Plastic", color: "White", dimensions: "Indoor: 105 x 32 x 24 cm", brand: "Voltas", weight: "15 kg (indoor)"
  },
  {
    name: "1 Ton Window AC",
    description: "Affordable window AC with remote control",
    price: 19999, pricePerDay: 65, pricePerMonth: 749, securityDeposit: 2000,
    image: "https://images.unsplash.com/photo-1574107517-5b8f8a1e2c3d",
    images: ["https://images.unsplash.com/photo-1574107517-5b8f8a1e2c3d"],
    category: "Appliance", subCategory: "Air Conditioners", stock: 0, city: "Pune", ratings: 3.9, numOfReviews: 9,
    material: "Metal + Plastic", color: "White", dimensions: "60 x 45 x 75 cm", brand: "Lloyd", weight: "35 kg"
  },

  // ===== APPLIANCES - Microwaves =====
  {
    name: "Solo Microwave 20L",
    description: "20L solo microwave with auto-cook menus",
    price: 5999, pricePerDay: 20, pricePerMonth: 249, securityDeposit: 500,
    image: "https://images.unsplash.com/photo-1593069591-5b8f9a1e2c3d",
    images: ["https://images.unsplash.com/photo-1593069591-5b8f9a1e2c3d"],
    category: "Appliance", subCategory: "Microwaves", stock: 12, city: "Delhi", ratings: 4.0, numOfReviews: 15,
    material: "Metal + Glass", color: "White", dimensions: "45 x 35 x 27 cm", brand: "Samsung", weight: "11 kg"
  },
  {
    name: "Grill Microwave 28L",
    description: "28L grill microwave with convection mode",
    price: 10999, pricePerDay: 35, pricePerMonth: 399, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1574352640-5b8f0a1e2c3d",
    images: ["https://images.unsplash.com/photo-1574352640-5b8f0a1e2c3d"],
    category: "Appliance", subCategory: "Microwaves", stock: 6, city: "Bangalore", ratings: 4.2, numOfReviews: 11,
    material: "Stainless Steel + Glass", color: "Silver", dimensions: "52 x 42 x 32 cm", brand: "LG", weight: "16 kg"
  },

  // ===== APPLIANCES - Water Purifiers =====
  {
    name: "RO + UV Water Purifier",
    description: "8-stage RO + UV purification with mineralizer",
    price: 12999, pricePerDay: 40, pricePerMonth: 499, securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1586278898-5b8f1a1e2c3d",
    images: ["https://images.unsplash.com/photo-1586278898-5b8f1a1e2c3d"],
    category: "Appliance", subCategory: "Water Purifiers", stock: 10, city: "Delhi", ratings: 4.3, numOfReviews: 20,
    material: "ABS Plastic", color: "White & Blue", dimensions: "40 x 25 x 45 cm", brand: "Kent", weight: "8 kg"
  },
  {
    name: "Countertop Water Purifier",
    description: "Compact countertop RO purifier with touch dispensing",
    price: 8999, pricePerDay: 30, pricePerMonth: 349, securityDeposit: 800,
    image: "https://images.unsplash.com/photo-1586141498-5b8f2a1e2c3d",
    images: ["https://images.unsplash.com/photo-1586141498-5b8f2a1e2c3d"],
    category: "Appliance", subCategory: "Water Purifiers", stock: 5, city: "Mumbai", ratings: 4.1, numOfReviews: 9,
    material: "ABS Plastic + Stainless Steel", color: "Glossy Black", dimensions: "30 x 20 x 40 cm", brand: "Aquaguard", weight: "5 kg"
  },

  // ===== APPLIANCES - Air Purifiers =====
  {
    name: "Premium Air Purifier",
    description: "HEPA filter air purifier for large rooms up to 400 sqft",
    price: 15999, pricePerDay: 50, pricePerMonth: 599, securityDeposit: 1500,
    image: "https://images.unsplash.com/photo-1560009045-5b8f3a1e2c3d",
    images: ["https://images.unsplash.com/photo-1560009045-5b8f3a1e2c3d"],
    category: "Appliance", subCategory: "Air Purifiers", stock: 4, city: "Delhi", ratings: 4.4, numOfReviews: 13,
    material: "ABS Plastic", color: "White", dimensions: "45 x 25 x 65 cm", brand: "Philips", weight: "9 kg"
  },
  {
    name: "Compact Air Purifier",
    description: "Small air purifier for bedrooms and offices",
    price: 6999, pricePerDay: 25, pricePerMonth: 279, securityDeposit: 600,
    image: "https://images.unsplash.com/photo-1593447082-5b8f4a1e2c3d",
    images: ["https://images.unsplash.com/photo-1593447082-5b8f4a1e2c3d"],
    category: "Appliance", subCategory: "Air Purifiers", stock: 0, city: "Bangalore", ratings: 3.8, numOfReviews: 6,
    material: "Plastic", color: "White", dimensions: "30 x 20 x 40 cm", brand: "Mi", weight: "3.5 kg"
  },
];

async function seed() {
  try {
    await connectDB();

    await productModel.deleteMany({});
    console.log("Cleared existing products");

    const inserted = await productModel.insertMany(products);
    console.log(`Inserted ${inserted.length} products`);

    await mongoose.disconnect();
    console.log("Done! Disconnected.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
