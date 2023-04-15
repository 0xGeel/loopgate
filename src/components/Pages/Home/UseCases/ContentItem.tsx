import {
  DocumentIcon,
  FilmIcon,
  FolderIcon,
  GiftIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  NewspaperIcon,
  PaperClipIcon,
  QrCodeIcon,
  RadioIcon,
  ShoppingCartIcon,
  TicketIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import { Content, IconNames } from "./types";

const renderIcon = (iconName?: IconNames) => {
  const iconStyle = "w-5 h-5 text-sky-500";

  switch (iconName) {
    case IconNames.FILM:
      return <FilmIcon className={iconStyle} />;
    case IconNames.FOLDER:
      return <FolderIcon className={iconStyle} />;
    case IconNames.GIFT:
      return <GiftIcon className={iconStyle} />;
    case IconNames.MICROPHONE:
      return <MicrophoneIcon className={iconStyle} />;
    case IconNames.MUSIC:
      return <MusicalNoteIcon className={iconStyle} />;
    case IconNames.NEWSPAPER:
      return <NewspaperIcon className={iconStyle} />;
    case IconNames.PAPERCLIP:
      return <PaperClipIcon className={iconStyle} />;
    case IconNames.QR:
      return <QrCodeIcon className={iconStyle} />;
    case IconNames.RADIO:
      return <RadioIcon className={iconStyle} />;
    case IconNames.SHOPPING_CART:
      return <ShoppingCartIcon className={iconStyle} />;
    case IconNames.TICKET:
      return <TicketIcon className={iconStyle} />;
    case IconNames.VIDEO_CAMERA:
      return <VideoCameraIcon className={iconStyle} />;
    default:
      return <DocumentIcon className={iconStyle} />;
  }
};

const ContentItem = ({ title, iconName }: Content) => (
  <div className="flex items-center space-x-2 border border-white/10 rounded-full px-4 py-3 text-sm mx-2 shadow-lg font-display font-light">
    {renderIcon(iconName)}
    <span>{title}</span>
  </div>
);

export default ContentItem;
