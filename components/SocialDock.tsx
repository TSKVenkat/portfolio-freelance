import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SocialLinks } from '../lib/types';

interface SocialDockProps {
  links: SocialLinks;
  position?: 'left' | 'right';
  vertical?: boolean;
}

const SocialDock = ({ links, position = 'left', vertical = true }: SocialDockProps) => {
  // Only display social links that have values
  const socials = Object.entries(links || {}).filter(([_, url]) => url && url.trim() !== '');

  if (!socials.length) return null;

  // Set positioning classes based on props
  const positionClasses = vertical
    ? position === 'left'
      ? 'fixed left-4 bottom-20 flex flex-col gap-3'
      : 'fixed right-4 bottom-20 flex flex-col gap-3'
    : 'fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-4';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } },
  };

  // Map social media keys to their respective icons
  const iconMap = {
    github: <FaGithub className="w-5 h-5" />,
    instagram: <FaInstagram className="w-5 h-5" />,
    linkedin: <FaLinkedin className="w-5 h-5" />,
    twitter: <FaTwitter className="w-5 h-5" />,
    whatsapp: <FaWhatsapp className="w-5 h-5" />,
  };

  return (
    <motion.div 
      className={positionClasses}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {socials.map(([platform, url]) => (
        <motion.a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                   hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white
                   transition-colors duration-300"
          variants={item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit ${platform}`}
          title={`Visit ${platform}`}
        >
          {iconMap[platform as keyof typeof iconMap] || platform.charAt(0).toUpperCase()}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialDock; 