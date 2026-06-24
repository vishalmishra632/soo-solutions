import type { Product } from "@/types";

export const products: Product[] = [
  {
    brand: "Lorex",
    name: "Lorex 4K IP Cameras",
    category: "Cameras",
    summary: "High-resolution IP cameras with strong night vision for homes and small business.",
    features: ["4K resolution", "Colour night vision", "Local recording"],
  },
  {
    brand: "Lorex",
    name: "Lorex NVR Systems",
    category: "Recorders",
    summary: "Network video recorders with ample storage for continuous capture.",
    features: ["Multi-channel", "Expandable storage", "Remote playback"],
  },
  {
    brand: "Lorex",
    name: "Lorex Wired Camera Kits",
    category: "Kits",
    summary: "Matched camera-and-recorder kits for straightforward residential coverage.",
    features: ["Camera + recorder bundle", "Wired reliability", "Mobile app"],
  },
  {
    brand: "Hikvision",
    name: "Hikvision Turret & Bullet Cameras",
    category: "Cameras",
    summary: "Commercial-grade cameras built for demanding coverage and durability.",
    features: ["Wide model range", "Weather resistant", "Sharp detail"],
  },
  {
    brand: "Hikvision",
    name: "Hikvision NVR & DVR Recorders",
    category: "Recorders",
    summary: "Recorders sized for multi-camera commercial systems and retention needs.",
    features: ["High channel counts", "RAID-capable storage", "Centralized management"],
  },
  {
    brand: "Hikvision",
    name: "Hikvision Accessories",
    category: "Accessories",
    summary: "Mounts, power, and cabling components to complete a commercial install.",
    features: ["Mounting hardware", "Power supplies", "Cabling components"],
  },
  {
    brand: "HiLook",
    name: "HiLook Dome & Turret Cameras",
    category: "Cameras",
    summary: "Dependable everyday surveillance cameras at an accessible price point.",
    features: ["Solid value", "Clear daytime detail", "Easy to deploy"],
  },
  {
    brand: "HiLook",
    name: "HiLook Recorders",
    category: "Recorders",
    summary: "Compact recorders for small-to-mid systems where simplicity matters.",
    features: ["Compact form factor", "Simple setup", "Reliable capture"],
  },
  {
    brand: "HiLook",
    name: "HiLook Starter Kits",
    category: "Kits",
    summary: "Entry-level kits that pair cameras and a recorder for quick coverage.",
    features: ["All-in-one bundle", "Budget friendly", "Quick install"],
  },
];
