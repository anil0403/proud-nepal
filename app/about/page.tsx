import React from "react"
import { Facebook, Instagram, Music2, Youtube } from "lucide-react"

const SocialLink: React.FC<{
  href: string
  children: React.ReactNode
}> = ({ href, children }) => (
  <li className="mr-4 p-2 rounded-lg  hover:scale-110 transition-transform duration-300">
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  </li>
)

const About: React.FC = () => (
  <div className="w-full my-10">
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8  hover:scale-105 transition-transform duration-300">
          About Us
        </h2>
        <p className="text-lg mb-6 transition-opacity duration-300 hover:opacity-100">
          Proud Nepal IT Suppliers has been committed to delivering top-quality
          products to our valued customers from the very start.
          <br />
          As of now, our products reach every corner of Nepal. Regardless of our
          growth, our customers remain our priority. We listen, value their
          feedback, and are always ready to assist.
        </p>

        <div className="text-center border-t border-gray-700 pt-8 flex flex-wrap justify-between items-center">
          <div className="flex-1 pr-6">
            <h3 className="text-2xl font-bold mb-4 transition-transform duration-300 hover:scale-105">
              Company Details:
            </h3>
            <ul className="text-lg space-y-3">
              <li>Proud Nepal IT Suppliers Pvt. Ltd.</li>
              <li>Dhobidhara Marg, Kathmandu, Nepal</li>
              <li>+977 986-7174242</li>
              <li>info@proudnepal.com</li>
            </ul>

            <div className="my-5">
              <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 transition-transform duration-300 hover:scale-105">
                Connect
              </h3>
              <ul className="flex items-center space-x-4 text-2xl justify-center">
                <SocialLink href="https://www.facebook.com/proudnepalitsuppliers">
                  <Facebook />
                </SocialLink>
                <SocialLink href="https://www.instagram.com/proudnepalit/">
                  <Instagram />
                </SocialLink>
                <SocialLink href="https://www.tiktok.com/@shyamlalregmi5">
                  <Music2 />
                </SocialLink>
                <SocialLink href="https://www.youtube.com/@proudnepalitsupplierspvtltd">
                  <Youtube />
                </SocialLink>
              </ul>
            </div>
          </div>

          <div className="flex-1 md:pl-6 my-10">
            <h3 className="mb-2 text-left transition-transform duration-300 hover:scale-105">
              Reach Us At:
            </h3>
            <div className="relative w-full h-60">
              <iframe
                width="100%"
                height="100%"
                src="https://maps.google.com/maps?q=Proud Nepal It Suppliers&t=&z=10&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                title="Proud Nepal IT Suppliers Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default About
