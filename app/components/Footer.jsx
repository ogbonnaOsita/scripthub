import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-6 px-6 border-t border-t-black">
      <div className="flex justify-between items-center text-black text-sm">
        <span>© 2023 Scripts Hub. All Rights Reserved.</span>
        <div>
          <a href="/contact" className="hover:text-gray-700">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
