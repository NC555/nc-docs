import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdFace6 } from "react-icons/md";
import {
  REDDIT_URL,
  DISCORD_URL,
  GITHUB_MAIN_REPO_URL,
  LINKEDIN_URL,
  PERSONAL_BLOG,
} from "@site/src/constants";
import styles from "./styles.module.css";

export default function NavbarSocialIcons(): JSX.Element {
  const socialLinks = [
    {
      href: GITHUB_MAIN_REPO_URL,
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: LINKEDIN_URL,
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: PERSONAL_BLOG,
      icon: MdFace6,
      label: "Blog",
    },
  ];

  return (
    <div className={styles.socialIcons}>
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          title={label}
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
