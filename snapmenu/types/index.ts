export interface User {
  id: string;
  email: string;
}

export interface Dish {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  userId: string;
}

export interface DetectedText {
  text: string;
  bounds: {
    origin: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
} 