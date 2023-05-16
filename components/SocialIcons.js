"use client";
import React from "react";
import {
  FaDiscord,
  FaSpotify,
  FaStackOverflow,
  FaTwitter,
  FaGithubAlt,
} from "react-icons/fa";

const icons = [
  {
    icon: <FaTwitter />,
    label: "Twitter",
    link: "https://twitter.com/seed_1337",
  },
  {
    icon: <FaGithubAlt />,
    label: "GitHub",
    link: "https://github.com/seed1337",
  },
  {
    icon: <FaDiscord />,
    label: "Discord",
    link: "https://discord.com/",
  },
  {
    icon: <FaSpotify />,
    label: "Spotify",
    link: "https://open.spotify.com/user/3134z6dkl57bsbwbrbwmucdvklua",
  },
  {
    icon: <FaStackOverflow />,
    label: "Stack Overflow",
    link: "https://stackoverflow.com/users/19638068/euph0ria",
  },
];

const SocialIcons = () => {
  return (
    <div className="social-icons">
      {icons.map((item, index) => (
        <p key={index} onClick={() => window.open(item.link, "_blank")}>
          {item.icon}
        </p>
      ))}
    </div>
  );
};

export default SocialIcons;
