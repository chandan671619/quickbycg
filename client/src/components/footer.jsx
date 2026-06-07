import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      title: "AI Tools",
      items: [
        { name: "Write Article", to: "/ai/write-article" },
        { name: "Blog Titles", to: "/ai/blog-titles" },
        { name: "Generate Images", to: "/ai/generate-images" },
        { name: "Remove Background", to: "/ai/remove-background" },
        { name: "Remove Objects", to: "/ai/remove-object" },
        { name: "Review Resume", to: "/ai/review" },
        { name: "Community", to: "/ai/community" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "Dashboard", to: "/ai" },
        { name: "About Us", to: "/" },
        { name: "Contact", to: "/" },
        { name: "Support", to: "/" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Documentation", to: "/" },
        { name: "API Reference", to: "/" },
        { name: "Blog", to: "/ai/blog-titles" },
        { name: "Help Center", to: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-50 pt-14 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-16 pb-12">
          
          {/* Logo & Description */}
          <div className="flex-1 max-w-full lg:max-w-[400px]">
            <Link to="/">
              <h2 className="text-3xl font-bold text-zinc-800 mb-4">
                QuickAI
              </h2>
            </Link>

            <p className="text-sm leading-7 text-zinc-500 mb-7 max-w-80">
              QuickAI helps creators and businesses generate, edit and
              enhance content using powerful AI tools. Build faster,
              create smarter.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition"
              >
                X
              </a>

              <a
                href="#"
                className="size-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition"
              >
                in
              </a>

              <a
                href="#"
                className="size-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition"
              >
                YT
              </a>

              <a
                href="#"
                className="size-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition"
              >
                IG
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap sm:flex-nowrap flex-1 justify-between gap-8 w-full max-w-3xl">
            {links.map((link, index) => (
              <div key={index}>
                <h3 className="text-base font-semibold text-zinc-800 mb-6">
                  {link.title}
                </h3>

                <ul className="flex flex-col gap-3">
                  {link.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        to={item.to}
                        className="text-sm text-zinc-500 hover:text-zinc-800 transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-3 gap-8 py-10 border-t border-zinc-200">
          
          <div>
            <h4 className="text-lg font-semibold text-zinc-800 mb-3">
              Developed By
            </h4>

            <p className="text-sm text-zinc-500 leading-7">
              Parag - Frontend Engineer & Network Engineer
              <br />
              Kashish - Product Engineer & Startup Founder
              <br />
              Chandan -  Backend Engineer , Cloud Engineer & Database Engineer
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-800 mb-3">
              Phone
            </h4>

            <p className="text-sm text-zinc-500">
              +91 9467641226
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-800 mb-3">
              Email
            </h4>

            <p className="text-sm text-zinc-500">
              quickai.team@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-zinc-200">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Quick.ai. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              Terms of Service
            </Link>

            <Link
              to="/"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              About Us
            </Link>

            <Link
              to="/ai/community"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              Community
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;