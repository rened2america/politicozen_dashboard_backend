export const productColors = {
    mug: {
      white: "white",
      black: "#313131"
      // beige: "#F3E5AB",
      // red: "#FF0000",
      // blue: "#4169e1",
    },
    "t-shirt": {
      white: "white",
      beige: "#F3E5AB",
      red: "#FF0000",
      blue: "#4169e1",
      black: "#313131",
      "Sport Grey": "#8C8C8C",
      "Navy": "#000080",
      "Military Green": "#4B5320",
      "Gold": "#FFD700",
      "Cardinal Red": "#C41E3A",
      "Light Blue": "#ADD8E6",
      "Dark Heather": "#4A4A4A",
      "Orange": "#FFA500",
      "Light Pink": "#FFB6C1",
      "Sand": "#C2B280"
    },
    sweatshirt: {
      white: "white",
      beige: "#F3E5AB",
      red: "#FF0000",
      blue: "#4169e1",
      black: "#313131",
      "Navy": "#000080",
      "Indigo Blue": "#4B0082",
      "Orange": "#FFA500",
      "Sand": "#C2B280",
      "Heather Scarlet Red": "#FF2400",
      "Ash": "#B2BEB5",
      "Gold": "#FFD700",
      "Purple": "#800080",
      "Graphite Heather": "#696969",
      "Safety Green": "#00FF00"
    },
    hoodie: {
      white: "white",
      beige: "#F3E5AB",
      red: "#FF0000",
      blue: "#4169e1",
      black: "#313131",
      "Navy": "#000080",
      "Military Green": "#4B5320",
      "Sand": "#C2B280",
      "Light Pink": "#FFB6C1",
      "Forest Green": "#228B22",
      "Sport Grey": "#8C8C8C",
      "Cardinal Red": "#C41E3A",
      "Orange": "#FFA500",
      "Light Blue": "#ADD8E6",
      "Indigo Blue": "#4B0082"
    }
  } as const;
  

  export type ProductType = keyof typeof productColors;
  export type ColorsByProduct<T extends ProductType> = keyof typeof productColors[T];
  

  export const getAvailableColors = (productType: ProductType) => {
    return productColors[productType.toLowerCase() as ProductType];
  };
  
  // For backward compatibility with existing code using DEFAULT_COLORS
  export const DEFAULT_COLORS = {
    white: "white",
    beige: "#F3E5AB",
    red: "#FF0000",
    blue: "#4169e1",
    black: "#313131"
  };