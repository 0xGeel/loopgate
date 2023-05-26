export enum IconNames {
  DOCUMENT = "document",
  FILM = "film",
  FOLDER = "folder",
  GIFT = "gift",
  MICROPHONE = "microphone",
  MUSIC = "music",
  NEWSPAPER = "newspaper",
  PAPERCLIP = "paperclip",
  QR = "qr",
  RADIO = "radio",
  SHOPPING_CART = "shopping-cart",
  TICKET = "ticket",
  VIDEO_CAMERA = "video-camera",
}

export type Content = {
  title: string;
  iconName?: IconNames;
};

export type UseCase = {
  audience: string;
  description: string;
  content: Content[];
};

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}
