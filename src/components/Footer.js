import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-about">
                    <h3>About GlowMart</h3>
                    <p>
                        GlowMart is a leading technology e-commerce site, offering a wide range of products from the latest gadgets to everyday tech essentials. We strive to bring you the best in quality and service.
                    </p>
                    <p>
                        Address: 123 Tech Lane, Silicon Valley, CA, 94043
                    </p>
                    <p>Email: support@glowmart.com | Phone: +1 (800) 123-4567</p>
                </div>
                <div className="footer-links">
                    <h3>Sitemap</h3>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/faq">FAQ</a>
                </div>
                <div className="footer-newsletter">
                    <h3>Subscribe to our Newsletter</h3>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="newsletter-input"
                        />
                        <button type="submit" className="btn-subscribe">Subscribe</button>
                    </form>
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="social-icon" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="social-icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 GlowMart. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
