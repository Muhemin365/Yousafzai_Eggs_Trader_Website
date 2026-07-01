# API Contract — Yousafzai EGRO CMS

Base URL: `https://api.yousafzaigroup.com/v1` (or similar)

All endpoints return JSON. Auth endpoints use JWT. CMS endpoints require `Authorization: Bearer <token>`.

---

## 1. Authentication

### POST /api/auth/login

**Request:**
```json
{
  "email": "admin@yousafzaigroup.com",
  "password": "Admin@2025"
}
```

**Response (200):**
```json
{
  "token": "jwt...",
  "user": {
    "email": "admin@yousafzaigroup.com",
    "name": "Admin"
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

### POST /api/auth/logout
Invalidates token. No body required.

---

## 2. CMS Content — Full CRUD

Each section is a resource. The frontend expects these exact shapes:

### GET/PUT /api/cms/hero
```json
{
  "eyebrow": "International B2B Egg Trading & Supply",
  "h1Line1": "Trusted Egg Traders,",
  "h1Highlight": "Global Standards",
  "h1Line2": "Built for",
  "body": "Yousafzai EGRO is Pakistan's compliance-first egg trading and supply house...",
  "primaryCta": { "label": "Request a B2B Quote", "action": "#contact" },
  "secondaryCta": { "label": "Explore Our Supply Chain", "action": "#supply-chain" },
  "trustItems": [
    { "icon": "ShieldCheck", "text": "ISO 22000 Certified" },
    { "icon": "CheckCircle2", "text": "PSQCA & Halal Compliant" },
    { "icon": "Home", "text": "25+ Cities Served" }
  ],
  "cards": [
    { "value": "500K+", "label": "Eggs traded weekly" },
    { "value": "100%", "label": "Batch traceability" },
    { "value": "99%", "label": "On-time delivery" }
  ],
  "stats": [
    { "value": "280", "suffix": "+", "label": "Active B2B partners & clients" },
    { "value": "40", "suffix": "+", "label": "Vetted partner farms" },
    { "value": "8", "suffix": "+", "label": "Active certifications" },
    { "value": "99", "suffix": "%", "label": "On-time, in-spec delivery" }
  ]
}
```

### GET/PUT /api/cms/about
```json
{
  "eyebrow": "About Yousafzai EGRO",
  "title": "Connecting Farms to Businesses, With Compliance at the Core",
  "subtitle": "Yousafzai EGRO unites specialist egg trading with compliance-first B2B supply...",
  "quote": "\"To make egg supply predictable, sustainable, and profitable...\"",
  "quoteFooter": "Our Mission Statement",
  "values": [
    { "icon": "Box", "title": "Transparency", "body": "Every batch, every test result, every audit..." },
    { "icon": "ShieldCheck", "title": "Compliance First", "body": "..." },
    { "icon": "Clock", "title": "Reliability", "body": "..." }
  ],
  "paragraphs": ["string", "string", "string"],
  "team": [
    { "initials": "TY", "name": "Tariq Yousafzai", "role": "Managing Director", "bio": "..." },
    { "initials": "NR", "name": "Nadia Rehman", "role": "Head of Partnerships", "bio": "..." },
    { "initials": "BH", "name": "Bilal Hussain", "role": "Logistics Director", "bio": "..." }
  ]
}
```

### GET/PUT /api/cms/products
```json
{
  "eyebrow": "Products",
  "title": "Full-Range Egg Trading & Supply Portfolio",
  "subtitle": "One reliable partner for every egg procurement need...",
  "items": [
    {
      "badge": "Grade A",
      "name": "Commercial Grade A White",
      "description": "Consistent Grade A white shell eggs...",
      "tags": ["Daily Supply", "S-XL"],
      "image": "https://images.unsplash.com/photo-xxx"
    }
  ],
  "specs": [
    {
      "name": "White Shell Eggs",
      "grade": "Grade A",
      "sizes": "S, M, L, XL",
      "moq": "500 trays/week",
      "lead": "24 hrs",
      "status": "In Stock",
      "statusClass": "stock"
    }
  ]
}
```

### GET/PUT /api/cms/solutions
```json
{
  "eyebrow": "Trading Solutions",
  "title": "Grow With Us — Three Tiers, One Mission",
  "subtitle": "...",
  "tiers": [
    {
      "badge": "Silver Partner",
      "name": "Silver",
      "desc": "100–499 trays per week",
      "featured": false,
      "features": ["5% volume discount", "Email account support", "..."]
    }
  ]
}
```

### GET/PUT /api/cms/supply-chain
```json
{
  "eyebrow": "Supply Chain",
  "title": "A Fully Integrated, Cold-Chain-Managed Flow",
  "subtitle": "...",
  "steps": [
    { "icon": "Feather", "title": "Farm Sourcing", "desc": "Vetted partner farms..." }
  ],
  "features": [
    { "icon": "Sun", "title": "Cold Chain Management", "body": "Continuous 2–5°C..." }
  ]
}
```

### GET/PUT /api/cms/why-us
```json
{
  "eyebrow": "Why Choose Us",
  "title": "A Single, Dependable Source for Egg Trading & Supply",
  "reasons": [
    { "num": "01", "title": "Managed Supply Chain", "body": "End-to-end logistics..." }
  ]
}
```

### GET/PUT /api/cms/quality
```json
{
  "eyebrow": "Quality Assurance",
  "title": "Certified. Audited. Fully Traceable.",
  "subtitle": "...",
  "batch": {
    "id": "BATCH-2025-06-22-A47",
    "title": "Sample Batch Trace",
    "subtitle": "Live example...",
    "steps": [
      { "title": "Farm Collected", "time": "06:15 AM" }
    ]
  },
  "certs": [
    { "icon": "ClipboardList", "name": "ISO 22000:2018", "body": "Food Safety Management System", "status": "Active" }
  ]
}
```

### GET/PUT /api/cms/contact
```json
{
  "eyebrow": "Contact",
  "title": "B2B Egg Supply — Custom Pricing in 4 Hours",
  "subtitle": "...",
  "info": [
    { "icon": "Phone", "label": "Phone", "value": "+92 XXX XXXXXXX" },
    { "icon": "Mail", "label": "Email", "value": "b2b@yousafzaiegro.com" },
    { "icon": "MapPin", "label": "Headquarters", "value": "Peshawar, KPK, Pakistan" },
    { "icon": "Clock", "label": "Response Time", "value": "Formal quotation within 4 business hours" }
  ]
}
```

### GET/PUT /api/cms/company
```json
{
  "name": "YOUSAFZAI EGRO",
  "sub": "Egg Traders",
  "tagline": "International B2B egg trading and supply..."
}
```

### GET/PUT /api/cms/testimonials
Array of:
```json
[
  {
    "initials": "HM",
    "name": "Procurement Manager",
    "role": "Hotel Chain, Lahore",
    "text": "Their batch documentation has made our audits effortless..."
  }
]
```

### GET/PUT /api/cms/faq
Array of:
```json
[
  {
    "q": "How quickly can I receive a formal B2B quote?",
    "a": "Submit a quote request and our commercial team responds..."
  }
]
```

---

## 3. Quote / Contact Form

### POST /api/quotes

**Request:**
```json
{
  "companyName": "string",
  "industry": "Hotel / Restaurant / Café | Bakery / Confectionery | Retail / Supermarket | Food Manufacturer | Hospital / Institution | Other",
  "contactName": "string",
  "jobTitle": "string",
  "email": "string",
  "phone": "string",
  "productType": "Commercial Grade A White | Free-Range Brown | Certified Organic | Processing Grade | Mixed / Multiple",
  "weeklyVolume": "Under 50 | 50–199 | 200–499 | 500–1,999 | 2,000+",
  "deliveryLocation": "string",
  "notes": "string (optional)"
}
```

**Response (201):**
```json
{
  "id": "quote-xxx",
  "message": "Quote request received. You'll receive a formal quotation within 4 business hours."
}
```

---

## 4. Image Upload

### POST /api/upload
Multipart form-data with field `file`.

**Response (201):**
```json
{
  "url": "https://cdn.yousafzaigroup.com/uploads/filename.jpg"
}
```

Accepted formats: jpg, jpeg, png, webp. Max 5MB.

---

## 5. Bulk Content Sync (optional, for initial seed)

### GET /api/cms/all
Returns all sections in one response (used for initial page load).

```json
{
  "hero": { ... },
  "about": { ... },
  "products": { ... },
  "solutions": { ... },
  "supplyChain": { ... },
  "whyUs": { ... },
  "quality": { ... },
  "contact": { ... },
  "company": { ... },
  "testimonials": [ ... ],
  "faq": [ ... ]
}
```

### PUT /api/cms/all
Bulk update everything at once. Body same shape as above (optional, for admin "publish all" workflow).

---

## Error Response Format (all endpoints)
```json
{
  "error": "Human-readable message",
  "code": "ERROR_CODE",
  "details": {} (optional)
}
```

Standard codes: `VALIDATION_ERROR`, `NOT_FOUND`, `UNAUTHORIZED`, `FORBIDDEN`, `INTERNAL_ERROR`.
