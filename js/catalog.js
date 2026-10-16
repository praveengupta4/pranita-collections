/**
 * Editable store data for Pranita Collections.
 * Add categories or items here — the landing page and catalog update automatically.
 */
const CATALOG = {
  contact: {
    name: "Vinita Garg",
    phone: "(732) 910-6526",
  },

  sale: {
    active: false,
    title: "Seasonal Sale",
    message: "Enjoy special pricing on select pieces. Contact us for details.",
  },

  categories: [
    { id: "lehengas", label: "Lehengas" },
    { id: "sarees", label: "Sarees" },
    { id: "kurtas", label: "Kurtas" },
    { id: "blouses", label: "Blouses" },
    { id: "jewelry", label: "Jewelry" },
  ],

  items: [
    {
      id: "lehenga-1",
      categoryId: "lehengas",
      name: "RON-139",
      image: "assets/products/lehengas/RON-139.png?v=1",
    },
    {
      id: "lehenga-2",
      categoryId: "lehengas",
      name: "RON-290",
      image: "assets/products/lehengas/RON-290.png?v=1",
    },
    {
      id: "lehenga-3",
      categoryId: "lehengas",
      name: "RON-238",
      image: "assets/products/lehengas/RON-238.png?v=1",
    },
    {
      id: "saree-1",
      categoryId: "sarees",
      name: "Banarasi Silk Saree",
      image: "",
    },
    {
      id: "saree-2",
      categoryId: "sarees",
      name: "Georgette Party Saree",
      image: "",
    },
    {
      id: "saree-3",
      categoryId: "sarees",
      name: "Cotton Handloom Saree",
      image: "",
    },
    {
      id: "kurta-1",
      categoryId: "kurtas",
      name: "Embroidered Anarkali Kurta",
      image: "",
    },
    {
      id: "kurta-2",
      categoryId: "kurtas",
      name: "Straight-Cut Everyday Kurta",
      image: "",
    },
    {
      id: "kurta-3",
      categoryId: "kurtas",
      name: "Festive Kurta Set",
      image: "",
    },
    {
      id: "blouse-1",
      categoryId: "blouses",
      name: "Mirror-Work Blouse",
      image: "",
    },
    {
      id: "blouse-2",
      categoryId: "blouses",
      name: "Backless Designer Blouse",
      image: "",
    },
    {
      id: "blouse-3",
      categoryId: "blouses",
      name: "Silk Elbow-Sleeve Blouse",
      image: "",
    },
    {
      id: "jewelry-1",
      categoryId: "jewelry",
      name: "Kundan Necklace Set",
      image: "",
    },
    {
      id: "jewelry-2",
      categoryId: "jewelry",
      name: "Temple Jewelry Earrings",
      image: "",
    },
    {
      id: "jewelry-3",
      categoryId: "jewelry",
      name: "Bridal Maang Tikka",
      image: "",
    },
  ],
};
