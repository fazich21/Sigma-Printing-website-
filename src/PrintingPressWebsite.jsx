import { useState, useEffect, createContext, useContext, useReducer, useRef } from "react";

const products = [
  { id: 1, name: "Visiting Cards", slug: "visiting-cards", category: "Cards", price: 500, oldPrice: 800, image: "https://images.unsplash.com/photo-1572502742782-9f02cc7e1b93?w=400&q=80", emoji: "🪪", shortDescription: "Premium quality visiting cards with sharp printing and matte/glossy finish.", description: "Make a lasting first impression with our high-quality visiting cards. Available in matte, glossy, UV, and velvet lamination finishes. Custom sizes and paper weights available.", features: ["300 GSM premium paper", "Matte or glossy finish", "UV coating available", "Double-sided printing", "Fast 24-hour delivery"], specifications: { Size: '3.5" x 2"', Paper: "300 GSM Art Card", Printing: "4 Color Offset", Finishing: "Matte/Glossy/UV", MOQ: "100 Cards" }, rating: 4.9, reviewsCount: 248, featured: true, inStock: true },
  { id: 2, name: "Wedding Cards", slug: "wedding-cards", category: "Wedding Products", price: 2500, oldPrice: 3500, image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80", emoji: "💒", shortDescription: "Elegant wedding invitation cards with intricate designs and premium paper.", description: "Celebrate your special day with beautifully crafted wedding invitation cards. Our expert designers create stunning layouts with traditional and modern themes.", features: ["Premium ivory paper", "Gold/silver foiling", "Embossed designs", "Custom envelopes included", "Multiple languages supported"], specifications: { Size: '5" x 7" (Standard)', Paper: "350 GSM Ivory Card", Printing: "Digital + Offset", Finishing: "Foiling/Embossing", MOQ: "50 Cards" }, rating: 4.8, reviewsCount: 156, featured: true, inStock: true },
  { id: 3, name: "Automatic Stamp Maker", slug: "automatic-stamp-maker", category: "Stamps", price: 1200, oldPrice: 1500, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", emoji: "🔏", shortDescription: "Self-inking automatic stamps with crisp, clean impressions every time.", description: "Our automatic self-inking stamps are perfect for businesses that need consistent, professional-looking stamps. No ink pad required — thousands of impressions before refilling.", features: ["Self-inking mechanism", "5000+ impressions per ink", "Custom text and logo", "Multiple color options", "Ready in 24 hours"], specifications: { Size: "Up to 60mm x 40mm", Ink: "Self-inking oil-based", Colors: "Red, Blue, Black, Green", Frame: "Heavy-duty plastic", Impressions: "5000+" }, rating: 4.7, reviewsCount: 89, featured: true, inStock: true },
  { id: 4, name: "Advertisement Boards", slug: "advertisement-boards", category: "Office Branding", price: 5000, oldPrice: 7000, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80", emoji: "🪧", shortDescription: "Large-format advertisement boards for outdoor and indoor use.", description: "High-visibility advertisement boards printed on durable materials. Perfect for storefronts, events, and exhibitions. Weather-resistant outdoor printing available.", features: ["UV-resistant outdoor ink", "Aluminum/Flex substrate", "Full-color printing", "Custom sizing available", "Mounting hardware included"], specifications: { Size: "4ft x 8ft (Standard)", Material: "Flex/Aluminum/Acrylic", Printing: "Solvent/UV Inkjet", Finish: "Weatherproof coating", Lifespan: "3-5 years outdoor" }, rating: 4.6, reviewsCount: 67, featured: false, inStock: true },
  { id: 5, name: "Badge Printing", slug: "badge-printing", category: "Promotional Items", price: 150, oldPrice: 200, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80", emoji: "📛", shortDescription: "Custom printed badges for events, conferences, and corporate use.", description: "Professional name badges and event badges with pin, clip, or lanyard attachment. Available in various sizes and materials including plastic and metal.", features: ["Durable materials", "Full-color printing", "Multiple attachment options", "Quick turnaround", "Bulk discounts available"], specifications: { Size: '2" x 3.5" to 4" x 6"', Material: "PVC / Metal", Printing: "Digital UV", Finish: "Gloss/Matte", Attachment: "Pin/Clip/Lanyard" }, rating: 4.5, reviewsCount: 43, featured: false, inStock: true },
  { id: 6, name: "Brochure Printing", slug: "brochure-printing", category: "Printing", price: 3000, oldPrice: 4000, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", emoji: "📄", shortDescription: "Tri-fold and bi-fold brochures with vibrant colors and premium paper.", description: "Create compelling marketing materials with our high-quality brochure printing. Available in multiple fold options, paper weights, and finishes to make your brand stand out.", features: ["Multiple fold options", "Vibrant CMYK printing", "130-250 GSM paper", "Gloss/matte lamination", "Bulk pricing available"], specifications: { Size: "A4/A5/DL", Paper: "130-250 GSM", Printing: "4+4 Color Offset", Folding: "Bi-fold/Tri-fold/Z-fold", MOQ: "100 Pieces" }, rating: 4.7, reviewsCount: 112, featured: true, inStock: true },
  { id: 7, name: "Business Cards", slug: "business-cards", category: "Cards", price: 600, oldPrice: 900, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", emoji: "💼", shortDescription: "Premium business cards that leave a lasting impression.", description: "Elevate your professional image with our luxury business card printing. Available with spot UV, embossing, foiling, and letterpress for a truly premium feel.", features: ["350 GSM thick stock", "Spot UV coating", "Gold/silver foiling", "Rounded corners option", "Soft-touch lamination"], specifications: { Size: '3.5" x 2"', Paper: "350 GSM", Printing: "Offset + Special Finish", Finishing: "Spot UV/Foil/Emboss", MOQ: "50 Cards" }, rating: 4.9, reviewsCount: 334, featured: true, inStock: true },
  { id: 8, name: "Cap Printing", slug: "cap-printing", category: "Promotional Items", price: 450, oldPrice: 600, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80", emoji: "🧢", shortDescription: "Custom embroidered or printed caps for teams and promotions.", description: "Brand your team or event with custom-printed or embroidered caps. Available in multiple styles including baseball caps, trucker hats, and flat-brim designs.", features: ["High-quality embroidery", "Screen/digital printing", "Multiple cap styles", "Minimum 6 pieces", "Color-matching available"], specifications: { Material: "Cotton/Polyester blend", Printing: "Embroidery/Screen print", Colors: "50+ color options", Sizes: "Adjustable/Fitted", MOQ: "12 Pieces" }, rating: 4.4, reviewsCount: 78, featured: false, inStock: true },
  { id: 9, name: "Certificate Printing", slug: "certificate-printing", category: "Printing", price: 200, oldPrice: 300, image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80", emoji: "🏅", shortDescription: "Elegant certificate printing on premium paper with border designs.", description: "Create professional certificates for achievements, completions, and awards. Available with gold foiling, embossed seals, and premium paper stocks.", features: ["A4/A3/Legal sizes", "Gold foil borders", "Embossed seal option", "Multiple templates", "Serial numbering available"], specifications: { Size: "A4 / A3 / Letter", Paper: "200-300 GSM Premium", Printing: "Digital/Offset", Finish: "Gloss/Matte/Foil", MOQ: "1 Piece" }, rating: 4.8, reviewsCount: 156, featured: false, inStock: true },
  { id: 10, name: "Diaries Printing", slug: "diaries-printing", category: "Corporate Gifts", price: 800, oldPrice: 1200, image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80", emoji: "📓", shortDescription: "Custom branded diaries for corporate gifting and personal use.", description: "Professional diaries with your company logo, brand colors, and custom content. Perfect for corporate gifting, year planners, and promotional items.", features: ["Leather/hardcover options", "Custom logo printing", "Personalized pages", "Gold ribbon bookmark", "Pen holder included"], specifications: { Size: "A5 (Standard)", Cover: "Leather/Hardcover", Pages: "200-365 pages", Printing: "4-color offset", MOQ: "50 Pieces" }, rating: 4.6, reviewsCount: 89, featured: false, inStock: true },
  { id: 11, name: "Election Stickers", slug: "election-stickers", category: "Printing", price: 1500, oldPrice: 2000, image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&q=80", emoji: "🗳️", shortDescription: "Bold, eye-catching election campaign stickers and posters.", description: "High-visibility election campaign stickers, banners, and posters printed with waterproof inks. Fast turnaround for campaign deadlines.", features: ["Weatherproof vinyl", "Vibrant colors", "Custom sizes", "Fast 12-hour delivery", "Bulk discounts"], specifications: { Material: "Vinyl/Paper", Printing: "Digital UV", Finish: "Waterproof", Sizes: "Any custom size", MOQ: "100 Pieces" }, rating: 4.5, reviewsCount: 45, featured: false, inStock: true },
  { id: 12, name: "Envelope Printing", slug: "envelope-printing", category: "Office Branding", price: 800, oldPrice: 1000, image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&q=80", emoji: "✉️", shortDescription: "Custom-printed envelopes with your company logo and details.", description: "Professional envelopes with your company branding, return address, and logo. Available in multiple sizes from DL to A4 size envelopes.", features: ["Multiple envelope sizes", "Window envelopes available", "Custom colors", "Gummed or self-seal", "Offset printing quality"], specifications: { Sizes: "DL / C5 / C4 / Custom", Paper: "90-120 GSM", Printing: "1-4 Color Offset", Finish: "Plain/Window", MOQ: "100 Pieces" }, rating: 4.4, reviewsCount: 56, featured: false, inStock: true },
  { id: 13, name: "Flash / Laser Stamps", slug: "flash-laser-stamps", category: "Stamps", price: 800, oldPrice: 1000, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80", emoji: "⚡", shortDescription: "Ultra-fine laser-cut stamps with precise detail and sharp edges.", description: "Flash and laser stamps deliver incredible precision and detail. Perfect for complex logos, signatures, and decorative stamp designs.", features: ["Laser-precise cutting", "Ultra-fine details", "Pre-inked option", "Long-lasting impression", "Custom shapes available"], specifications: { Size: "Up to 50mm x 50mm", Technology: "Flash/Laser", Colors: "Single color", Impressions: "10,000+", Detail: "0.1mm precision" }, rating: 4.7, reviewsCount: 34, featured: false, inStock: true },
  { id: 14, name: "Hanging Wall Calendars", slug: "hanging-wall-calendars", category: "Calendars", price: 1200, oldPrice: 1600, image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80", emoji: "📅", shortDescription: "12-month wall calendars with stunning photography and custom branding.", description: "Beautiful hanging wall calendars featuring your brand imagery across 12 months. Perfect for corporate gifting, client giveaways, and office branding.", features: ["12-month full-color", "A3 size per page", "Metal spiral binding", "Custom photography", "Branded header/footer"], specifications: { Size: "A3 per page (12 pages)", Paper: "200 GSM Art Paper", Binding: "Metal spiral", Printing: "4-color offset", MOQ: "25 Pieces" }, rating: 4.8, reviewsCount: 67, featured: false, inStock: true },
  { id: 15, name: "Keychain Makers", slug: "keychain-makers", category: "Promotional Items", price: 200, oldPrice: 300, image: "https://images.unsplash.com/photo-1558618047-f4e80c86d5b6?w=400&q=80", emoji: "🔑", shortDescription: "Custom branded keychains with photo printing or logo engraving.", description: "Memorable promotional keychains with your logo or custom design. Available in acrylic, metal, rubber, and leather materials.", features: ["Multiple materials", "Full-color printing", "Laser engraving available", "Custom shapes", "Bulk pricing"], specifications: { Material: "Acrylic/Metal/Rubber", Size: "40mm-70mm", Printing: "UV digital/Engraving", Finish: "Gloss/Matte/Metal", MOQ: "50 Pieces" }, rating: 4.5, reviewsCount: 123, featured: false, inStock: true },
  { id: 16, name: "Mehfil Milad Pana", slug: "mehfil-milad-pana", category: "Printing", price: 2000, oldPrice: 2800, image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=400&q=80", emoji: "☪️", shortDescription: "Beautiful Mehfil and Milad Mustafa banners with Islamic designs.", description: "Colorful and respectful Mehfil Milad banners with traditional Islamic patterns, calligraphy, and custom text for your religious gatherings.", features: ["Traditional Islamic designs", "Arabic calligraphy", "Weather-resistant flex", "Custom text/dates", "Fast delivery"], specifications: { Material: "Flex/Vinyl", Size: "4x6 to 10x20 ft", Printing: "Solvent inkjet", Finish: "Hemmed edges", MOQ: "1 Piece" }, rating: 4.9, reviewsCount: 89, featured: false, inStock: true },
  { id: 17, name: "Mug Printing", slug: "mug-printing", category: "Promotional Items", price: 450, oldPrice: 600, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80", emoji: "☕", shortDescription: "Personalized photo mugs and branded corporate mugs.", description: "Create memorable personalized mugs with photos, logos, and custom text. Perfect for corporate gifting, personal gifts, and promotional merchandise.", features: ["Sublimation printing", "Dishwasher safe", "330ml standard size", "Panoramic printing", "Magic mugs available"], specifications: { Size: "330ml / 450ml", Material: "Ceramic", Printing: "Sublimation", Colors: "Full-color", MOQ: "1 Piece" }, rating: 4.7, reviewsCount: 203, featured: false, inStock: true },
  { id: 18, name: "Nylon Rubber Stamps", slug: "nylon-rubber-stamps", category: "Stamps", price: 400, oldPrice: 600, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80", emoji: "🔖", shortDescription: "Durable nylon rubber stamps for everyday business use.", description: "Long-lasting nylon and rubber stamps for everyday business applications. Available in standard and custom sizes with various ink colors.", features: ["Nylon/rubber material", "Sharp impression", "Custom ink colors", "Wooden/plastic handle", "Durable construction"], specifications: { Size: "20mm to 80mm", Material: "Nylon/Rubber", Handle: "Wood/Plastic", Ink: "All standard colors", Lifespan: "Years of use" }, rating: 4.4, reviewsCount: 56, featured: false, inStock: true },
  { id: 19, name: "Office Plate Printing", slug: "office-plate-printing", category: "Office Branding", price: 1500, oldPrice: 2000, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", emoji: "🏢", shortDescription: "Professional office name plates and signage for corporate spaces.", description: "Sleek, professional office plates and signage for departments, offices, and meeting rooms. Available in acrylic, metal, and wooden finishes.", features: ["Acrylic/Metal/Wood", "Engraved or printed", "Custom sizes", "Wall-mount hardware", "LED backlit option"], specifications: { Material: "Acrylic/Aluminum/Wood", Size: "Any custom size", Printing: "UV/Laser engraving", Finish: "Polished/Brushed", MOQ: "1 Piece" }, rating: 4.6, reviewsCount: 78, featured: false, inStock: true },
  { id: 20, name: "Panaflex Printing", slug: "panaflex-printing", category: "Office Branding", price: 3000, oldPrice: 4500, image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400&q=80", emoji: "🪟", shortDescription: "Vibrant large-format Panaflex banners for shops and events.", description: "High-quality Panaflex (flex banner) printing for shop fronts, outdoor advertising, and event backdrops. Weatherproof and fade-resistant.", features: ["Weatherproof printing", "Bright vibrant colors", "Custom sizes", "Hemmed edges", "Grommets included"], specifications: { Material: "Panaflex Flex", Size: "Any custom size", Printing: "Solvent inkjet", Resolution: "720-1440 dpi", Finish: "Hemmed + Grommets" }, rating: 4.7, reviewsCount: 145, featured: true, inStock: true },
  { id: 21, name: "Pen Printing", slug: "pen-printing", category: "Promotional Items", price: 80, oldPrice: 120, image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80", emoji: "🖊️", shortDescription: "Custom logo-printed pens for corporate branding and gifting.", description: "Promotional pens with your logo and contact information. Available in ball-point, gel, and premium executive styles for all budgets.", features: ["Multiple pen styles", "Pad printing/engraving", "Bulk discounts", "Smooth writing", "Custom colors"], specifications: { Material: "Plastic/Metal", Printing: "Pad print/Laser engrave", Colors: "30+ options", Ink: "Black/Blue/Red", MOQ: "50 Pieces" }, rating: 4.3, reviewsCount: 167, featured: false, inStock: true },
  { id: 22, name: "Plate Printing", slug: "plate-printing", category: "Printing", price: 500, oldPrice: 700, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", emoji: "🔲", shortDescription: "High-quality offset printing plates for production runs.", description: "Professional offset printing plates for commercial printing jobs. CTP (Computer to Plate) technology for sharper, more accurate printing.", features: ["CTP technology", "Sharp dot reproduction", "Multiple plate sizes", "Fast processing", "Long print run life"], specifications: { Material: "Aluminum", Technology: "CTP Digital", Size: "A4 to newspaper", Lifespan: "100,000+ impressions", Resolution: "2400 dpi" }, rating: 4.5, reviewsCount: 34, featured: false, inStock: true },
  { id: 23, name: "Pocket Stamps", slug: "pocket-stamps", category: "Stamps", price: 350, oldPrice: 500, image: "https://images.unsplash.com/photo-1512317049220-d3c6fcaf6681?w=400&q=80", emoji: "🗃️", shortDescription: "Compact pocket-sized stamps for on-the-go professionals.", description: "Convenient pocket stamps that fit in your pocket or purse. Self-inking mechanism delivers clean, consistent impressions wherever you are.", features: ["Ultra-compact design", "Self-inking", "Re-inkable", "Clear impression", "Durable case"], specifications: { Size: "14mm to 30mm", Type: "Self-inking pocket", Ink: "All standard colors", Impressions: "3000+", Refillable: "Yes" }, rating: 4.4, reviewsCount: 45, featured: false, inStock: true },
  { id: 24, name: "Promotional Tables", slug: "promotional-tables", category: "Promotional Items", price: 8000, oldPrice: 12000, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80", emoji: "🪑", shortDescription: "Branded promotional tables and display stands for events.", description: "Custom-branded folding tables with printed tablecloths for trade shows, exhibitions, and promotional events. Professional and portable.", features: ["Custom branded tablecloth", "Portable folding table", "Full-color printing", "Multiple sizes", "Carrying bag included"], specifications: { Size: "6ft / 8ft tables", Material: "Aluminum + Polyester", Printing: "Dye-sublimation", Finish: "Machine washable cloth", MOQ: "1 Set" }, rating: 4.5, reviewsCount: 23, featured: false, inStock: true },
  { id: 25, name: "PVC Cards Printing", slug: "pvc-cards-printing", category: "Cards", price: 300, oldPrice: 450, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80", emoji: "💳", shortDescription: "Durable PVC cards for membership, ID, and loyalty programs.", description: "Professional PVC cards with the look and feel of credit cards. Perfect for membership cards, ID cards, loyalty cards, and access control systems.", features: ["Credit card quality", "Magnetic stripe option", "RFID chip option", "Full-color printing", "Barcode/QR code"], specifications: { Size: "CR80 (Standard credit card)", Material: "0.76mm PVC", Printing: "Digital offset", Options: "Mag stripe/RFID/Hologram", MOQ: "50 Cards" }, rating: 4.8, reviewsCount: 89, featured: false, inStock: true },
  { id: 26, name: "Receipt Books", slug: "receipt-books", category: "Office Branding", price: 600, oldPrice: 800, image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80", emoji: "🧾", shortDescription: "Custom carbonless receipt books for professional invoicing.", description: "Professional receipt books and invoice books with your business information, logo, and serial numbers. Carbonless duplicate or triplicate copies available.", features: ["Carbonless copies", "Serial numbering", "Custom header/logo", "Perforated pages", "Hard cover option"], specifications: { Size: "A4/A5/Custom", Copies: "Duplicate/Triplicate", Paper: "60 GSM NCR", Pages: "25-100 sets", MOQ: "5 Books" }, rating: 4.6, reviewsCount: 112, featured: false, inStock: true },
  { id: 27, name: "Shield Makers", slug: "shield-makers", category: "Corporate Gifts", price: 2500, oldPrice: 3500, image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80", emoji: "🛡️", shortDescription: "Prestigious award shields and trophies for corporate recognition.", description: "Custom award shields and trophies for recognizing achievements, milestones, and excellence. Available in crystal, acrylic, wood, and metal finishes.", features: ["Crystal/Acrylic/Wood/Metal", "Laser engraving", "Custom design", "Base mount included", "Presentation box"], specifications: { Material: "Crystal/Acrylic/Wood/Metal", Size: "Small to XL", Engraving: "Laser precision", Finish: "Polished/Natural", MOQ: "1 Piece" }, rating: 4.7, reviewsCount: 56, featured: false, inStock: true },
  { id: 28, name: "T-Shirt Printing", slug: "t-shirt-printing", category: "Promotional Items", price: 700, oldPrice: 1000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", emoji: "👕", shortDescription: "High-quality custom T-shirt printing for teams and brands.", description: "Professional T-shirt printing using screen printing, DTG (Direct to Garment), and heat transfer techniques. Perfect for teams, events, and merchandise.", features: ["Screen/DTG/Heat transfer", "All sizes available", "Premium fabric options", "Full-color printing", "Bulk team discounts"], specifications: { Material: "100% Cotton/Polyester", Sizes: "XS to 5XL", Printing: "Screen/DTG/Heat press", Colors: "Unlimited", MOQ: "12 Pieces" }, rating: 4.8, reviewsCount: 298, featured: true, inStock: true },
  { id: 29, name: "Table Calendars", slug: "table-calendars", category: "Calendars", price: 900, oldPrice: 1200, image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80", emoji: "🗓️", shortDescription: "Desktop table calendars with your brand on every page.", description: "Professional desktop calendars featuring your brand artwork across all 12 months. A daily reminder of your brand on every desk.", features: ["12-month branding", "A5 desktop size", "Spiral bound", "Custom artwork each month", "Stand included"], specifications: { Size: "A5 / A4", Paper: "150 GSM coated", Binding: "Spiral wire", Stand: "Cardboard easel back", MOQ: "25 Pieces" }, rating: 4.7, reviewsCount: 78, featured: false, inStock: true },
  { id: 30, name: "USB Printing", slug: "usb-printing", category: "Corporate Gifts", price: 500, oldPrice: 700, image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=400&q=80", emoji: "💾", shortDescription: "Custom-branded USB drives — perfect tech corporate gifts.", description: "Promotional USB flash drives with your logo engraved or printed. Available in 4GB to 128GB storage. A practical gift that keeps your brand top-of-mind.", features: ["4GB to 128GB options", "Logo engraving/printing", "Multiple USB styles", "Pre-loading available", "Custom packaging"], specifications: { Capacity: "4GB-128GB", Material: "Metal/Plastic/Wood", Interface: "USB 2.0 / 3.0", Printing: "Laser engrave/UV print", MOQ: "25 Pieces" }, rating: 4.5, reviewsCount: 67, featured: false, inStock: true },
  { id: 31, name: "Wedding Box Printing", slug: "wedding-box-printing", category: "Wedding Products", price: 3500, oldPrice: 5000, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80", emoji: "📦", shortDescription: "Luxurious custom-printed wedding favor boxes and gift packaging.", description: "Exquisite wedding packaging boxes custom-printed with your wedding theme, names, and date. Available in various shapes and sizes with premium finishing.", features: ["Custom shapes/sizes", "Gold/silver foiling", "Embossed designs", "Ribbon closure", "Bulk discounts"], specifications: { Material: "250-350 GSM Card", Size: "Any custom size", Printing: "Offset + Foiling", Finish: "Lamination + Foil", MOQ: "50 Pieces" }, rating: 4.8, reviewsCount: 89, featured: false, inStock: true },
  { id: 32, name: "Panaflex Shop Signs", slug: "panaflex-shop-signs", category: "Office Branding", price: 4000, oldPrice: 6000, image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80", emoji: "🏪", shortDescription: "Eye-catching Panaflex shop signs to make your business visible.", description: "Brilliant illuminated and non-illuminated Panaflex signage for your shop front. High-impact designs that attract customers day and night.", features: ["LED backlit option", "Weather-resistant", "Custom sizing", "Bold vivid colors", "Professional design"], specifications: { Material: "Panaflex + Aluminum", Size: "Custom any size", Printing: "Backlit Solvent", Lighting: "LED optional", Lifespan: "5+ years" }, rating: 4.7, reviewsCount: 134, featured: true, inStock: true },
];

const categories = ["All", "Cards", "Stamps", "Printing", "Promotional Items", "Calendars", "Office Branding", "Wedding Products", "Corporate Gifts"];

// ── Context ──────────────────────────────────────────────────
const CartCtx = createContext(null);
const WishCtx = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": { const ex = state.find(i => i.id === action.p.id); return ex ? state.map(i => i.id === action.p.id ? { ...i, qty: i.qty + 1 } : i) : [...state, { ...action.p, qty: 1 }]; }
    case "REMOVE": return state.filter(i => i.id !== action.id);
    case "QTY": return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i);
    case "CLEAR": return [];
    default: return state;
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const add = p => dispatch({ type: "ADD", p });
  const remove = id => dispatch({ type: "REMOVE", id });
  const qty = (id, q) => dispatch({ type: "QTY", id, qty: q });
  const clear = () => dispatch({ type: "CLEAR" });
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return <CartCtx.Provider value={{ cart, add, remove, qty, clear, total, count }}>{children}</CartCtx.Provider>;
}

function WishProvider({ children }) {
  const [list, setList] = useState([]);
  const toggle = p => setList(prev => prev.find(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]);
  const has = id => list.some(i => i.id === id);
  return <WishCtx.Provider value={{ list, toggle, has }}>{children}</WishCtx.Provider>;
}

const useCart = () => useContext(CartCtx);
const useWish = () => useContext(WishCtx);

// ── Toast ─────────────────────────────────────────────────────
function useToast() {
  const [toasts, set] = useState([]);
  const toast = (msg, type = "success") => { const id = Date.now(); set(p => [...p, { id, msg, type }]); setTimeout(() => set(p => p.filter(t => t.id !== id)), 3000); };
  return { toasts, toast };
}
function Toasts({ toasts }) {
  return <div style={{ position: "fixed", top: 80, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
    {toasts.map(t => <div key={t.id} style={{ background: t.type === "success" ? "#10B981" : t.type === "error" ? "#EF4444" : "#2563EB", color: "#fff", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", animation: "toastIn .3s ease", minWidth: 220 }}>{t.msg}</div>)}
  </div>;
}

// ── Stars ─────────────────────────────────────────────────────
const Stars = ({ r, size = 13 }) => <span style={{ color: "#F59E0B", fontSize: size }}>{"★".repeat(Math.floor(r))}{"☆".repeat(5 - Math.floor(r))}</span>;

// ── Product Detail Modal ──────────────────────────────────────
function DetailModal({ product: p, onClose, toast }) {
  const { add } = useCart();
  const { toggle, has } = useWish();
  const [qty, setQty] = useState(1);
  const wishlisted = has(p.id);
  const disc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 860, maxHeight: "92vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", animation: "modalIn .3s ease" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Image side */}
          <div style={{ flex: "0 0 300px", minWidth: 240 }}>
            <div style={{ height: 280, overflow: "hidden", position: "relative" }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px 0 0 0" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div style={{ display: "none", position: "absolute", inset: 0, background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", alignItems: "center", justifyContent: "center", fontSize: 80, borderRadius: "24px 0 0 0" }}>{p.emoji}</div>
              {disc > 0 && <div style={{ position: "absolute", top: 14, left: 14, background: "#EF4444", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{disc}% OFF</div>}
            </div>
            <div style={{ padding: "20px 22px", background: "#F8FAFC", borderTop: "1px solid #E5E7EB", borderRadius: "0 0 0 24px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 800, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>Specifications</p>
              {Object.entries(p.specifications).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #E5E7EB", fontSize: 13 }}>
                  <span style={{ color: "#6B7280" }}>{k}</span>
                  <span style={{ fontWeight: 600, color: "#111827", textAlign: "right", maxWidth: "55%" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Content side */}
          <div style={{ flex: 1, minWidth: 260, padding: "28px 28px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "3px 12px", borderRadius: 20 }}>{p.category}</span>
              <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#374151" }}>×</button>
            </div>
            <h2 style={{ margin: "0 0 10px", fontSize: 24, fontWeight: 900, color: "#111827", lineHeight: 1.2 }}>{p.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Stars r={p.rating} size={15} />
              <span style={{ fontSize: 13, color: "#6B7280" }}>({p.reviewsCount} reviews)</span>
              <span style={{ fontSize: 12, background: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>✓ In Stock</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16, padding: "12px 16px", background: "#F8FAFC", borderRadius: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#2563EB" }}>Rs {p.price.toLocaleString()}</span>
              {p.oldPrice && <span style={{ fontSize: 15, color: "#9CA3AF", textDecoration: "line-through" }}>Rs {p.oldPrice.toLocaleString()}</span>}
              {disc > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: "#EF4444" }}>Save Rs {(p.oldPrice - p.price).toLocaleString()}</span>}
            </div>
            <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.75, marginBottom: 18 }}>{p.description}</p>
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 800, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>Key Features</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                {p.features.map((f, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}><span style={{ color: "#10B981", fontWeight: 800 }}>✓</span>{f}</div>)}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Qty:</span>
              <div style={{ display: "flex", alignItems: "center", border: "2px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, background: "#F8FAFC", border: "none", cursor: "pointer", fontSize: 20, fontWeight: 700, color: "#374151" }}>−</button>
                <span style={{ width: 48, textAlign: "center", fontSize: 16, fontWeight: 800 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 40, background: "#F8FAFC", border: "none", cursor: "pointer", fontSize: 20, fontWeight: 700, color: "#374151" }}>+</button>
              </div>
              <span style={{ fontSize: 13, color: "#6B7280" }}>Total: <strong style={{ color: "#2563EB" }}>Rs {(p.price * qty).toLocaleString()}</strong></span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => { for (let i = 0; i < qty; i++) add(p); toast(`${p.name} ×${qty} added! 🛒`); onClose(); }}
                style={{ flex: 1, minWidth: 130, background: "#2563EB", color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                🛒 Add to Cart
              </button>
              <button onClick={() => { toggle(p); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️", wishlisted ? "error" : "success"); }}
                style={{ width: 48, height: 48, background: wishlisted ? "#FEF2F2" : "#F8FAFC", border: `2px solid ${wishlisted ? "#FCA5A5" : "#E5E7EB"}`, borderRadius: 12, cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {wishlisted ? "❤️" : "🤍"}
              </button>
              <a href={`https://wa.me/923001234567?text=Hi! I want to order ${p.name} x${qty}. Price: Rs ${(p.price * qty).toLocaleString()}`} target="_blank" rel="noreferrer"
                style={{ flex: 1, minWidth: 130, background: "#10B981", color: "#fff", borderRadius: 12, padding: "13px 0", fontSize: 15, fontWeight: 700, textAlign: "center", textDecoration: "none", display: "block" }}>
                📱 WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────
function Card({ p, toast, onDetail }) {
  const { add } = useCart();
  const { toggle, has } = useWish();
  const wishlisted = has(p.id);
  const disc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

  return (
    <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #E5E7EB", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", transition: "transform .2s, box-shadow .2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(37,99,235,.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      {disc > 0 && <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: "#EF4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{disc}% OFF</div>}
      <button onClick={e => { e.stopPropagation(); toggle(p); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️", wishlisted ? "error" : "success"); }}
        style={{ position: "absolute", top: 12, right: 12, zIndex: 2, width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.92)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}>
        {wishlisted ? "❤️" : "🤍"}
      </button>
      <div onClick={() => onDetail(p)} style={{ cursor: "pointer", height: 180, overflow: "hidden", position: "relative", background: "#F8FAFC", flexShrink: 0 }}>
        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
        <div style={{ display: "none", position: "absolute", inset: 0, background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", alignItems: "center", justifyContent: "center", fontSize: 60 }}>{p.emoji}</div>
      </div>
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "2px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: ".05em", alignSelf: "flex-start" }}>{p.category}</span>
        <h3 onClick={() => onDetail(p)} style={{ margin: "8px 0 4px", fontSize: 15, fontWeight: 800, color: "#111827", cursor: "pointer", lineHeight: 1.3 }}>{p.name}</h3>
        <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 10px", lineHeight: 1.55, flex: 1 }}>{p.shortDescription.slice(0, 68)}…</p>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <Stars r={p.rating} />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>({p.reviewsCount})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>Rs {p.price.toLocaleString()}</span>
          {p.oldPrice && <span style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "line-through" }}>Rs {p.oldPrice.toLocaleString()}</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { add(p); toast(`${p.name} added to cart! 🛒`); }}
            style={{ flex: 1, background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "background .2s" }}
            onMouseEnter={e => e.target.style.background = "#1d4ed8"}
            onMouseLeave={e => e.target.style.background = "#2563EB"}>+ Add to Cart</button>
          <button onClick={() => onDetail(p)} title="View Details"
            style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 10, padding: "9px 14px", fontSize: 13, cursor: "pointer", color: "#374151" }}>👁</button>
        </div>
      </div>
    </div>
  );
}

// ── Cart Drawer ───────────────────────────────────────────────
function CartDrawer({ open, onClose }) {
  const { cart, remove, qty, total, clear } = useCart();
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 900 }} />}
      <div style={{ position: "fixed", top: 0, right: open ? 0 : "-430px", width: 400, maxWidth: "95vw", height: "100vh", background: "#fff", zIndex: 901, boxShadow: "-8px 0 40px rgba(0,0,0,.14)", transition: "right .35s cubic-bezier(.4,0,.2,1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>🛒 Cart <span style={{ fontWeight: 400, color: "#6B7280", fontSize: 13 }}>({cart.length})</span></h2>
          <button onClick={onClose} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 18, color: "#374151" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {cart.length === 0 ? <div style={{ textAlign: "center", padding: "60px 20px" }}><div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div><p style={{ color: "#6B7280" }}>Your cart is empty</p></div>
            : cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 12, padding: 12, background: "#F8FAFC", borderRadius: 14, alignItems: "center", border: "1px solid #E5E7EB" }}>
                <div style={{ width: 54, height: 54, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
                  <span style={{ display: "none", fontSize: 24 }}>{item.emoji}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                  <p style={{ margin: "0 0 7px", fontSize: 12, color: "#2563EB", fontWeight: 600 }}>Rs {item.price.toLocaleString()}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
                      <button onClick={() => qty(item.id, item.qty - 1)} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>−</button>
                      <span style={{ width: 26, textAlign: "center", fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => qty(item.id, item.qty + 1)} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>+</button>
                    </div>
                    <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 12, fontWeight: 600 }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", flexShrink: 0 }}>Rs {(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "14px 20px", borderTop: "1px solid #E5E7EB", background: "#F8FAFC" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 14 }}><span style={{ color: "#6B7280" }}>Subtotal</span><span style={{ fontWeight: 700 }}>Rs {total.toLocaleString()}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14 }}><span style={{ color: "#6B7280" }}>Delivery</span><span style={{ fontWeight: 700, color: "#10B981" }}>Free</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingTop: 10, borderTop: "2px solid #E5E7EB" }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: 19, color: "#2563EB" }}>Rs {total.toLocaleString()}</span>
            </div>
            <a href={`https://wa.me/923001234567?text=Order: ${cart.map(i => `${i.name} x${i.qty}`).join(", ")}. Total: Rs ${total.toLocaleString()}`} target="_blank" rel="noreferrer"
              style={{ display: "block", width: "100%", background: "#10B981", color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "center", textDecoration: "none", marginBottom: 8 }}>
              📱 Order via WhatsApp
            </a>
            <button onClick={clear} style={{ width: "100%", background: "none", border: "1px solid #E5E7EB", borderRadius: 12, padding: "10px 0", fontSize: 13, cursor: "pointer", color: "#6B7280" }}>Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar({ setCartOpen, activePage, setPage }) {
  const { count } = useCart();
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  const links = [{ id: "home", label: "Home" }, { id: "products", label: "Products" }, { id: "about", label: "About" }, { id: "contact", label: "Contact" }];

  return (
    <>
      {/* Top bar */}
      <div style={{ background: "#1E3A8A", color: "#fff", padding: "7px 40px", fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <span>📞 <a href="tel:+923001234567" style={{ color: "#93C5FD", textDecoration: "none" }}>+92 300 1234567</a></span>
          <span>✉️ <a href="mailto:info@alprinting.pk" style={{ color: "#93C5FD", textDecoration: "none" }}>info@alprinting.pk</a></span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <span>📍 Raja Bazar, Rawalpindi</span>
          <span>⏰ Mon–Sat 9am–8pm</span>
        </div>
      </div>
      {/* Main nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 800, background: "#fff", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.10)" : "0 1px 0 #E5E7EB", transition: "box-shadow .3s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, height: 46, background: "linear-gradient(135deg,#2563EB,#10B981)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 12px rgba(37,99,235,.25)" }}>🖨</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#111827", letterSpacing: "-0.3px" }}>AL Printing Press</div>
              <div style={{ fontSize: 10, color: "#10B981", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700 }}>Quality You Can Trust</div>
            </div>
          </div>
          {/* Desktop links */}
          <div style={{ display: "flex", gap: 2 }} className="desk-nav">
            {links.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)}
                style={{ background: "none", border: "none", padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: activePage === l.id ? "#2563EB" : "#374151", borderRadius: 10, transition: "all .2s", position: "relative" }}>
                {l.label}
                {activePage === l.id && <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 24, height: 3, background: "#2563EB", borderRadius: 3 }} />}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, background: "#10B981", color: "#fff", borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none" }} className="desk-nav">
              📱 WhatsApp
            </a>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              🛒 Cart
              {count > 0 && <span style={{ background: "#EF4444", color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
            </button>
            <button onClick={() => setMob(m => !m)} style={{ background: "none", border: "1px solid #E5E7EB", borderRadius: 10, padding: "9px 12px", cursor: "pointer", fontSize: 18 }} className="mob-only">☰</button>
          </div>
        </div>
        {mob && (
          <div style={{ borderTop: "1px solid #E5E7EB", background: "#fff", padding: "8px 24px 16px" }}>
            {links.map(l => (
              <button key={l.id} onClick={() => { setPage(l.id); setMob(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "13px 0", cursor: "pointer", fontSize: 15, fontWeight: activePage === l.id ? 700 : 500, color: activePage === l.id ? "#2563EB" : "#374151", borderBottom: "1px solid #F3F4F6" }}>
                {l.label}
              </button>
            ))}
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 12, background: "#10B981", color: "#fff", borderRadius: 10, padding: "11px 0", textAlign: "center", textDecoration: "none", fontWeight: 700 }}>📱 WhatsApp Us</a>
          </div>
        )}
      </nav>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero({ setPage }) {
  return (
    <section style={{ background: "linear-gradient(135deg,#EFF6FF 0%,#F0FDF4 100%)", padding: "0 40px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", padding: "80px 0" }} className="hero-grid">
        {/* Left */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#DBEAFE", color: "#1D4ED8", borderRadius: 30, padding: "7px 18px", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            🏆 #1 Printing Press in Rawalpindi
          </div>
          <h1 style={{ fontSize: "clamp(32px,4vw,54px)", fontWeight: 900, color: "#111827", lineHeight: 1.12, margin: "0 0 22px", letterSpacing: "-1px" }}>
            Premium Quality<br />
            <span style={{ background: "linear-gradient(135deg,#2563EB,#10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Printing Services</span><br />
            in Rawalpindi
          </h1>
          <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.75, marginBottom: 36 }}>
            From visiting cards to wedding invitations — exceptional quality with 24hr turnaround. 32+ services, trusted by 10,000+ customers.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => setPage("products")} style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 13, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(37,99,235,.35)" }}>Browse Products →</button>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer"
              style={{ background: "#fff", color: "#10B981", border: "2px solid #10B981", borderRadius: 13, padding: "14px 28px", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>
              📱 Free Quote
            </a>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["10K+", "Customers"], ["32+", "Services"], ["15+", "Years"], ["24hr", "Delivery"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#2563EB" }}>{n}</div>
                <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: image collage */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "210px 210px", gap: 14, position: "relative" }} className="hero-imgs">
          <div style={{ borderRadius: 20, overflow: "hidden", gridRow: "1 / 3" }}>
            <img src="https://images.unsplash.com/photo-1572502742782-9f02cc7e1b93?w=500&q=80" alt="Cards" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ borderRadius: 20, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80" alt="Brochure" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ borderRadius: 20, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" alt="Tshirt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Floating badge */}
          <div style={{ position: "absolute", bottom: -14, left: -14, background: "#fff", borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,.13)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 42, height: 42, background: "#DCFCE7", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#111827" }}>24hr Delivery</div>
              <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>Rush orders available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── All Products on Home ──────────────────────────────────────
function HomeProducts({ toast, onDetail }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(8);

  const filtered = products.filter(p => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section style={{ padding: "80px 40px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#111827", margin: "0 0 12px", letterSpacing: "-.5px" }}>All <span style={{ color: "#2563EB" }}>Products</span></h2>
          <p style={{ color: "#6B7280", fontSize: 16 }}>32 premium printing services — all in one place</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <input type="text" placeholder="🔍  Search products..." value={search} onChange={e => { setSearch(e.target.value); setVisible(8); }}
            style={{ width: "100%", maxWidth: 460, padding: "12px 20px", border: "2px solid #E5E7EB", borderRadius: 40, fontSize: 15, outline: "none", background: "#fff" }}
            onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map(c => (
            <button key={c} onClick={() => { setCat(c); setVisible(8); }}
              style={{ padding: "8px 18px", borderRadius: 30, border: "2px solid", borderColor: cat === c ? "#2563EB" : "#E5E7EB", background: cat === c ? "#2563EB" : "#fff", color: cat === c ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 22, marginBottom: 36 }}>
          {filtered.slice(0, visible).map(p => <Card key={p.id} p={p} toast={toast} onDetail={onDetail} />)}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "40px 0" }}><div style={{ fontSize: 54, marginBottom: 12 }}>🔍</div><p style={{ color: "#6B7280" }}>No products found.</p></div>}
        {visible < filtered.length && (
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setVisible(v => v + 8)} style={{ background: "#fff", border: "2px solid #2563EB", color: "#2563EB", borderRadius: 12, padding: "13px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Load More ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────
function WhyChoose() {
  const items = [
    { icon: "🎨", title: "Premium Quality", desc: "Top-grade inks and papers on every single order.", color: "#EFF6FF", ac: "#2563EB" },
    { icon: "⚡", title: "Fast Turnaround", desc: "Most orders ready in 24–48 hrs. Rush in 12 hrs.", color: "#FFF7ED", ac: "#F59E0B" },
    { icon: "💰", title: "Best Prices", desc: "Competitive pricing with bulk discounts always.", color: "#F0FDF4", ac: "#10B981" },
    { icon: "🎯", title: "Custom Design", desc: "Expert designers craft artwork for your brand.", color: "#FDF2F8", ac: "#A855F7" },
    { icon: "📦", title: "Free Delivery", desc: "Free delivery in Rawalpindi & Islamabad Rs 1,000+.", color: "#FFF1F2", ac: "#EF4444" },
    { icon: "💬", title: "24/7 Support", desc: "Instant support via WhatsApp any time you need.", color: "#F0F9FF", ac: "#0EA5E9" },
  ];
  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="why-grid">
          <div>
            <div style={{ display: "inline-block", background: "#EFF6FF", color: "#2563EB", borderRadius: 30, padding: "6px 18px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 900, color: "#111827", lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-.5px" }}>
              We Make Your Brand<br /><span style={{ color: "#2563EB" }}>Look Amazing</span>
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 32 }}>15+ years of experience, state-of-the-art equipment, and a passionate team dedicated to making every print perfect.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[["10K+", "Customers", "#2563EB"], ["32+", "Services", "#10B981"], ["15+", "Years Exp.", "#F59E0B"]].map(([n, l, c]) => (
                <div key={l} style={{ background: "#F8FAFC", borderRadius: 16, padding: "20px 24px", textAlign: "center", border: "1px solid #E5E7EB", flex: "1 1 100px" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: c }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {items.map(r => (
              <div key={r.title} style={{ background: r.color, borderRadius: 18, padding: "20px 16px", border: `1px solid ${r.ac}22`, transition: "transform .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                <div style={{ width: 46, height: 46, background: "#fff", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12, boxShadow: `0 4px 12px ${r.ac}22` }}>{r.icon}</div>
                <h3 style={{ margin: "0 0 7px", fontSize: 14, fontWeight: 800, color: "#111827" }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials Slider ───────────────────────────────────────
function TestimonialsSlider() {
  const [cur, setCur] = useState(0);
  const timer = useRef(null);

  const reviews = [
    { name: "Ahmed Raza", role: "Business Owner, Rawalpindi", text: "AL Printing has been our go-to for 5 years. The visiting cards quality is exceptional and delivery is always on time. Highly recommended!", rating: 5, avatar: "AR", color: "#2563EB" },
    { name: "Sara Khan", role: "Event Planner, Islamabad", text: "Used them for wedding cards for 3 different clients. Every client was absolutely impressed with the quality and the beautiful design work!", rating: 5, avatar: "SK", color: "#10B981" },
    { name: "Muhammad Ali", role: "Corporate Manager", text: "Ordered 500 promotional pens and 200 branded mugs. Perfect quality, on-time delivery, and the best pricing we found in Rawalpindi!", rating: 5, avatar: "MA", color: "#F59E0B" },
    { name: "Fatima Sheikh", role: "Shop Owner, Saddar", text: "Got my Panaflex sign made here. The colors are brilliant — weathering perfectly outdoors for over a year. Very happy customer!", rating: 5, avatar: "FS", color: "#A855F7" },
    { name: "Bilal Hussain", role: "School Principal", text: "Certificate printing for our annual day was superb! The gold foiling and embossed borders made them look very prestigious and professional.", rating: 5, avatar: "BH", color: "#EF4444" },
    { name: "Nadia Malik", role: "Marketing Manager", text: "Best brochure printing in Rawalpindi, no doubt. Colors matched our brand identity perfectly and paper quality is premium for the price.", rating: 5, avatar: "NM", color: "#0EA5E9" },
  ];

  const go = (i) => { clearTimeout(timer.current); setCur(i); };
  useEffect(() => { timer.current = setTimeout(() => setCur(c => (c + 1) % reviews.length), 4500); return () => clearTimeout(timer.current); }, [cur]);

  const r = reviews[cur];

  return (
    <section style={{ padding: "80px 40px", background: "#111827" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing: "-.5px" }}>What Customers <span style={{ color: "#10B981" }}>Say</span></h2>
          <p style={{ color: "#9CA3AF", fontSize: 16 }}>Trusted by 10,000+ happy customers across Pakistan</p>
        </div>
        {/* Card */}
        <div style={{ background: "#1F2937", borderRadius: 24, padding: "44px 52px", border: "1px solid #374151", display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", minHeight: 220, transition: "all .4s" }}>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 10 }}>{r.avatar}</div>
            <span style={{ color: "#F59E0B", fontSize: 15 }}>{"★".repeat(r.rating)}</span>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 52, color: r.color, lineHeight: 1, marginBottom: 14, fontFamily: "Georgia,serif", opacity: .8 }}>"</div>
            <p style={{ fontSize: 16, color: "#D1D5DB", lineHeight: 1.8, margin: "0 0 20px", fontStyle: "italic" }}>{r.text}</p>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{r.name}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{r.role}</div>
          </div>
        </div>
        {/* Dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 32 }}>
          <button onClick={() => go((cur - 1 + reviews.length) % reviews.length)}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid #374151", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <div style={{ display: "flex", gap: 8 }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                style={{ width: i === cur ? 28 : 10, height: 10, borderRadius: 5, border: "none", background: i === cur ? "#10B981" : "#374151", cursor: "pointer", transition: "all .3s", padding: 0 }} />
            ))}
          </div>
          <button onClick={() => go((cur + 1) % reviews.length)}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid #374151", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────
function Process() {
  return (
    <section style={{ padding: "80px 40px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#111827", margin: "0 0 12px", letterSpacing: "-.5px" }}>How It <span style={{ color: "#10B981" }}>Works</span></h2>
          <p style={{ color: "#6B7280", fontSize: 16 }}>Simple 4-step process to get your prints</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
          {[
            { num: "01", title: "Choose Service", desc: "Browse our 32+ services and select what you need", icon: "🔍" },
            { num: "02", title: "Send Design", desc: "Share your artwork or request our free design service", icon: "🎨" },
            { num: "03", title: "Get Quote", desc: "Instant pricing via WhatsApp — no hidden costs", icon: "💬" },
            { num: "04", title: "Get Delivered", desc: "Fast delivery to your doorstep, ready to use", icon: "📦" },
          ].map(s => (
            <div key={s.num} style={{ background: "#fff", borderRadius: 20, padding: "32px 24px", textAlign: "center", border: "1px solid #E5E7EB", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 18, fontSize: 38, fontWeight: 900, color: "#F3F4F6" }}>{s.num}</div>
              <div style={{ width: 62, height: 62, background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 26 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What is the minimum order quantity?", a: "MOQ varies: Visiting cards from 100 pcs, T-shirts from 12 pcs, certificates from 1 pc. Contact us for specifics." },
    { q: "How long does printing take?", a: "Most standard orders ready in 24–48 hrs. Rush 12-hour delivery available. Large orders may take 3–5 days." },
    { q: "Do you deliver across Pakistan?", a: "Yes! Free delivery in Rawalpindi & Islamabad on Rs 1,000+. Courier charges apply for outstation." },
    { q: "Can I provide my own design?", a: "Absolutely! We accept AI, PDF, CDR, PSD, PNG formats (300 DPI min). We also offer free design consultation." },
    { q: "What payment methods do you accept?", a: "Cash, bank transfer, EasyPaisa, JazzCash. Advance or COD available for WhatsApp orders." },
  ];
  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#111827", margin: "0 0 12px", letterSpacing: "-.5px" }}>Frequently Asked <span style={{ color: "#2563EB" }}>Questions</span></h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{f.q}</span>
              <span style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid", borderColor: open === i ? "#2563EB" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: open === i ? "#2563EB" : "#fff", color: open === i ? "#fff" : "#374151", flexShrink: 0 }}>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && <p style={{ margin: "0 0 18px", fontSize: 15, color: "#4B5563", lineHeight: 1.75 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA({ setPage }) {
  return (
    <section style={{ padding: "80px 40px", background: "linear-gradient(135deg,#1E40AF,#065F46)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "rgba(255,255,255,.04)", borderRadius: "50%" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-.5px" }}>Ready to Print?</h2>
        <p style={{ color: "rgba(255,255,255,.75)", fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>Get instant quotes on WhatsApp. We're ready to make your brand look absolutely amazing.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ background: "#10B981", color: "#fff", borderRadius: 13, padding: "15px 36px", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>📱 Chat on WhatsApp</a>
          <button onClick={() => setPage("products")} style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "2px solid rgba(255,255,255,.3)", borderRadius: 13, padding: "15px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Browse All Products →</button>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function About() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#111827", margin: "0 0 16px", letterSpacing: "-1px" }}>About <span style={{ color: "#2563EB" }}>AL Printing</span></h1>
        <p style={{ color: "#6B7280", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>Rawalpindi's trusted printing press since 2009.</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 72 }} className="about-grid">
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 20 }}>Our Story</h2>
            <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: 16 }}>AL Printing Press was founded in 2009 with a single mission: to provide Rawalpindi businesses with world-class printing at fair prices.</p>
            <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: 16 }}>Over 15 years, we've grown from a small card-printing shop to a full-service house offering 32+ services — from wedding invitations to large-format Panaflex banners.</p>
            <p style={{ color: "#4B5563", lineHeight: 1.85 }}>Today we serve 10,000+ satisfied customers with state-of-the-art digital and offset printing technology.</p>
          </div>
          <div style={{ borderRadius: 24, overflow: "hidden", height: 360 }}>
            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80" alt="Press" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20 }}>
          {[["2009", "Year Founded", "#2563EB"], ["10,000+", "Happy Customers", "#10B981"], ["32+", "Print Services", "#F59E0B"], ["15+", "Years Experience", "#A855F7"]].map(([n, l, c]) => (
            <div key={l} style={{ background: "#F8FAFC", borderRadius: 20, padding: "30px 20px", textAlign: "center", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: c, marginBottom: 8 }}>{n}</div>
              <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────
function Contact({ toast }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const submit = () => {
    if (!form.name || !form.phone) { toast("Please fill name and phone", "error"); return; }
    toast("Message sent! We'll contact you soon 🎉");
    setForm({ name: "", phone: "", email: "", msg: "" });
  };
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#111827", margin: "0 0 16px", letterSpacing: "-1px" }}>Contact <span style={{ color: "#2563EB" }}>Us</span></h1>
        <p style={{ color: "#6B7280", fontSize: 18 }}>We're here to help with all your printing needs</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="contact-grid">
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 28 }}>Get in Touch</h2>
            {[["📍", "Address", "Shop 12, Raja Bazar, Rawalpindi, Punjab 46000"], ["📞", "Phone / WhatsApp", "+92 300 1234567"], ["✉️", "Email", "info@alprinting.pk"], ["⏰", "Hours", "Mon–Sat: 9:00 AM – 8:00 PM"]].map(([icon, title, val]) => (
              <div key={title} style={{ display: "flex", gap: 16, marginBottom: 22, alignItems: "flex-start" }}>
                <div style={{ width: 46, height: 46, background: "#EFF6FF", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", marginBottom: 3, textTransform: "uppercase", letterSpacing: ".05em" }}>{title}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{val}</div>
                </div>
              </div>
            ))}
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#10B981", color: "#fff", borderRadius: 13, padding: "14px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none", marginTop: 16 }}>📱 Chat on WhatsApp</a>
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 24, padding: 40, border: "1px solid #E5E7EB" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 26 }}>Send a Message</h2>
            {[["name", "Full Name *", "Your name", "text"], ["phone", "Phone / WhatsApp *", "+92 300 xxxxxxx", "tel"], ["email", "Email Address", "your@email.com", "email"]].map(([k, l, ph, t]) => (
              <div key={k} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 7 }}>{l}</label>
                <input type={t} placeholder={ph} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                  style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 14, outline: "none", background: "#fff" }}
                  onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 7 }}>Message</label>
              <textarea rows={4} placeholder="Tell us about your printing requirements..." value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 14, outline: "none", resize: "vertical", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
            </div>
            <button onClick={submit} style={{ width: "100%", background: "#2563EB", color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Send Message →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#0F172A", color: "#fff", padding: "64px 40px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 44, marginBottom: 52 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,#2563EB,#10B981)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖨</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900 }}>AL Printing Press</div>
                <div style={{ fontSize: 10, color: "#10B981", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700 }}>Quality You Can Trust</div>
              </div>
            </div>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.8 }}>Rawalpindi's premier printing press since 2009. 10,000+ customers, 32+ services.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em", color: "#9CA3AF" }}>Quick Links</h3>
            {[["Home", "home"], ["Products", "products"], ["About Us", "about"], ["Contact", "contact"]].map(([l, p]) => (
              <button key={p} onClick={() => setPage(p)} style={{ display: "block", background: "none", border: "none", color: "#6B7280", fontSize: 14, padding: "5px 0", cursor: "pointer", textAlign: "left" }}
                onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#6B7280"}>→ {l}</button>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em", color: "#9CA3AF" }}>Top Services</h3>
            {["Visiting Cards", "Wedding Cards", "T-Shirt Printing", "Panaflex Banners", "Stamp Making", "Mug Printing"].map(s => <div key={s} style={{ color: "#6B7280", fontSize: 14, padding: "5px 0" }}>→ {s}</div>)}
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em", color: "#9CA3AF" }}>Contact</h3>
            <div style={{ color: "#6B7280", fontSize: 14, lineHeight: 2.2 }}>
              <div>📍 Raja Bazar, Rawalpindi</div>
              <div>📞 +92 300 1234567</div>
              <div>✉️ info@alprinting.pk</div>
              <div>⏰ Mon–Sat 9am–8pm</div>
            </div>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 16, background: "#10B981", color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📱 WhatsApp Us</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: "#4B5563", fontSize: 13, margin: 0 }}>© 2025 AL Printing Press. All rights reserved. | Rawalpindi, Pakistan</p>
          <p style={{ color: "#4B5563", fontSize: 13, margin: 0 }}>Made with ❤️ for quality printing</p>
        </div>
      </div>
    </footer>
  );
}

// ── Products Page ─────────────────────────────────────────────
function ProductsPage({ toast, onDetail }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  let filtered = products.filter(p => (cat === "All" || p.category === cat) && (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())));
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 40px" }}>
      <h1 style={{ fontSize: 38, fontWeight: 900, color: "#111827", marginBottom: 8, letterSpacing: "-.5px" }}>All Products</h1>
      <p style={{ color: "#6B7280", marginBottom: 30, fontSize: 15 }}>{filtered.length} products found</p>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input type="text" placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: "11px 18px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 14, outline: "none" }}
          onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "11px 18px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 14, background: "#fff", cursor: "pointer" }}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {categories.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: "8px 18px", borderRadius: 30, border: "2px solid", borderColor: cat === c ? "#2563EB" : "#E5E7EB", background: cat === c ? "#2563EB" : "#fff", color: cat === c ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>{c}</button>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 22 }}>
        {filtered.map(p => <Card key={p.id} p={p} toast={toast} onDetail={onDetail} />)}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0" }}><div style={{ fontSize: 60, marginBottom: 14 }}>🔍</div><p style={{ color: "#6B7280" }}>No products found.</p></div>}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const { toasts, toast } = useToast();

  const nav = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <CartProvider>
      <WishProvider>
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;}
          @keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
          @keyframes modalIn{from{opacity:0;transform:scale(.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
          @media(max-width:768px){
            .desk-nav{display:none!important}
            .hero-imgs{display:none!important}
            .hero-grid{grid-template-columns:1fr!important}
            .why-grid{grid-template-columns:1fr!important}
            .about-grid{grid-template-columns:1fr!important}
            .contact-grid{grid-template-columns:1fr!important}
          }
          @media(min-width:769px){.mob-only{display:none!important}}
        `}</style>
        <Toasts toasts={toasts} />
        <Navbar setCartOpen={setCartOpen} activePage={page} setPage={nav} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        {detail && <DetailModal product={detail} onClose={() => setDetail(null)} toast={toast} />}
        <main>
          {page === "home" && <>
            <Hero setPage={nav} />
            <HomeProducts toast={toast} onDetail={setDetail} />
            <WhyChoose />
            <Process />
            <TestimonialsSlider />
            <FAQ />
            <CTA setPage={nav} />
          </>}
          {page === "products" && <ProductsPage toast={toast} onDetail={setDetail} />}
          {page === "about" && <About />}
          {page === "contact" && <Contact toast={toast} />}
        </main>
        <Footer setPage={nav} />
      </WishProvider>
    </CartProvider>
  );
}
