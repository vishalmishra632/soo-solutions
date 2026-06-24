import type { SupplyCategory } from "@/types";

export const suppliesIntro = {
  eyebrow: "Beyond security",
  title: "Business supplies, kept in stock",
  description:
    "The same local businesses we secure also count on us for the everyday essentials they reorder — PPE, packaging, and till rolls, supplied by the case. Tell us what you need and we'll quote it.",
};

// Sent with the WhatsApp / email enquiry buttons so the message lands pre-filled and on-topic.
export const suppliesEnquiryMessage =
  "Hi Soo Solutions, I'd like pricing on some business supplies:";

export const supplyCategories: SupplyCategory[] = [
  {
    slug: "ppe-gloves",
    name: "PPE & Gloves",
    blurb:
      "Disposable gloves, masks, and sanitiser for shops, cafés, and kitchens — stocked by the case.",
    icon: "ShieldCheck",
    items: [
      {
        name: "Nitrile Gloves",
        spec: "Powder-free, 3-mil, sizes S–XL. Boxes of 100, tough enough for kitchen and cleaning work.",
        packNote: "By the case — ask for case & pallet rates.",
        options: ["Small", "Medium", "Large", "X-Large"],
        imageId: "sup-nitrile-gloves",
      },
      {
        name: "Vinyl Gloves",
        spec: "Powder-free, for light prep and high-turnover stations. Boxes of 100, lower cost than nitrile.",
        packNote: "By the case — bulk pricing on request.",
        options: ["Small", "Medium", "Large", "X-Large"],
        imageId: "sup-vinyl-gloves",
      },
      {
        name: "Face Masks",
        spec: "3-ply earloop with a bendable nose wire. Boxes of 50.",
        packNote: "By the case — bulk pricing on request.",
        options: ["Box of 50", "Case", "Pallet"],
        imageId: "sup-face-masks",
      },
      {
        name: "Hand Sanitiser",
        spec: "70% alcohol gel, unscented. 500ml counter pumps and 4L refill jugs.",
        packNote: "By the case — better rates on refill jugs.",
        options: ["500ml pump", "4L refill jug"],
        imageId: "sup-hand-sanitizer",
      },
    ],
  },
  {
    slug: "restaurant-supplies",
    name: "Restaurant & Packaging Supplies",
    blurb:
      "Takeout containers, bags, boxes, and disposable tableware local kitchens and shops reorder by the case.",
    icon: "Utensils",
    items: [
      {
        name: "Takeout Containers & Lids",
        spec: "Foam and hinged clamshells and deli tubs — lids matched to every size, from sauce tubs to 3-compartment.",
        packNote: "By the case — mixed-size cases on request.",
        options: ["Clamshell", "Deli tub", "1 & 3-compartment"],
        imageId: "sup-takeout-containers",
      },
      {
        name: "Bags & Boxes",
        spec: "Kraft paper bags, handled poly bags, and folding white boxes for retail and takeout.",
        packNote: "By the bundle or case — ask for pallet rates.",
        options: ["Kraft bag", "Poly bag", "White box"],
        imageId: "sup-bags-boxes",
      },
      {
        name: "Cutlery, Cups & Napkins",
        spec: "Wrapped or bulk cutlery, hot and cold cups with matching lids, and napkins.",
        packNote: "By the case — mix-and-match for smaller kitchens.",
        options: ["Cutlery", "Cups + lids", "Napkins"],
        imageId: "sup-tableware",
      },
    ],
  },
  {
    slug: "pos-rolls",
    name: "POS & Receipt Rolls",
    blurb:
      "Thermal and bond rolls for tills, card terminals, and kitchen printers. Not sure which fits? Send a photo of your machine and we'll match it.",
    icon: "Receipt",
    items: [
      {
        name: "80mm Thermal Rolls",
        spec: "Standard thermal till rolls for most 80mm receipt printers. BPA-free stock available.",
        packNote: "By the case — bulk pricing on request.",
        options: ["80 × 50", "80 × 80", "BPA-free"],
        imageId: "sup-thermal-rolls",
      },
      {
        name: "57mm Debit Rolls",
        spec: "The narrow 57mm debit roll for countertop and handheld card terminals.",
        packNote: "By the case — ask for case & pallet rates.",
        options: ["57 × 38", "57 × 40", "Handheld"],
        imageId: "sup-debit-rolls",
      },
      {
        name: "Bond & 2-Ply Rolls",
        spec: "Plain bond for impact printers and carbonless 2-ply for kitchen tickets that need a copy.",
        packNote: "By the case — bring your machine make.",
        options: ["1-ply bond", "2-ply", "3-ply"],
        imageId: "sup-bond-rolls",
      },
    ],
  },
];
