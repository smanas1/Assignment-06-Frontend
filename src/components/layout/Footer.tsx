// src/components/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">BanglaPay</h3>
          <p className="text-sm text-muted-foreground">
            Secure digital wallet for Bangladesh. Send, receive, and manage
            money with ease.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-sm hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="text-sm hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm hover:text-primary">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-primary">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-primary">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-primary">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} BanglaPay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
