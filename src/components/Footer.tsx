import { Link } from "react-router-dom";
import { Leaf, Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="font-heading font-bold text-xl">GREEN LEGACY</span>
            </div>
            <p className="text-white/80 mb-4">
              Transforming celebrations into tree plantation rituals. Plant a memory, grow a legacy.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/greenlegacy_org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:greenlegacy.org@gmail.com" 
                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="text-white/80 hover:text-white transition-colors">Our Impact</Link></li>
              <li><Link to="/media" className="text-white/80 hover:text-white transition-colors">Media Gallery</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><Link to="/donate" className="text-white/80 hover:text-white transition-colors">Donate a Tree</Link></li>
              <li><Link to="/subscribe" className="text-white/80 hover:text-white transition-colors">Subscribe</Link></li>
              <li><Link to="/get-involved" className="text-white/80 hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link to="/get-involved" className="text-white/80 hover:text-white transition-colors">Corporate CSR</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:greenlegacy.org@gmail.com" className="hover:text-white transition-colors">
                  greenlegacy.org@gmail.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Form →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} GREEN LEGACY. All rights reserved. Founded by Pranay.</p>
        </div>
      </div>
    </footer>
  );
};
