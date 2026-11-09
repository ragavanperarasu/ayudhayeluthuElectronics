import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';

const ICONS = {
  security: SecurityRoundedIcon,
  service: HandymanRoundedIcon,
  custom: EmojiObjectsRoundedIcon,
  web: LanguageRoundedIcon,
  app: PhoneIphoneRoundedIcon,
};

export default function CategoryIcon({ name, ...props }) {
  const Icon = ICONS[name] ?? CategoryRoundedIcon;
  return <Icon {...props} />;
}
