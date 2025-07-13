import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-elite-secondary via-elite-primary to-elite-secondary text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Logo & Description */}
        <Link to={'/'}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500 text-white font-bold px-2 py-1 rounded">
                ESC
              </div>
              <h4 className="text-lg font-semibold">Elite Sports Club</h4>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Your premier destination for world-class sports facilities and
              professional coaching.
            </p>
            <div className="flex gap-4 text-white/70 text-lg">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </Link>

        {/* Quick Links */}
        <div>
          <h5 className="text-base font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Courts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Membership
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="text-base font-semibold mb-4">Contact Info</h5>
          <ul className="space-y-2 text-sm text-white/80">
            <li>123 Sports Avenue</li>
            <li>Elite District, City 12345</li>
            <li>+1 (555) 123-4567</li>
            <li>info@elitesportsclub.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 pt-4 text-center text-sm text-white/60">
        © 2024 Elite Sports Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
