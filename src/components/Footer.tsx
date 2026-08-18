"use client";
import React from "react";
import { motion } from "motion/react";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: faFacebook,
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: faInstagram,
      href: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: faXTwitter,
      href: "https://x.com",
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      href: "https://linkedin.com",
    },
  ];
  return (
    <div className="w-full bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-13">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">RIDEZO</h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Book any vehicle - from bikes to trucks. Trusted Owners.
              Transparent pricing.
            </p>
            <div className="flex mt-6 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Footer;
