"use client"

import React from "react"
import { Facebook, Instagram, Music2, Youtube } from "lucide-react"

const About: React.FC = () => {
  return (
    <>
      <div className="w-full my-10">
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 transform transition-transform hover:scale-105">
              About Us
            </h2>
            <p className="text-lg mb-6 transition-opacity hover:opacity-80">
              Proud Nepal IT Suppliers has been committed to delivering
              top-quality products to our valued customers from the very start.
              <br />
              As of now, our products reach every corner of Nepal. Regardless of
              our growth, our customers remain our priority. We listen, value
              their feedback, and are always ready to assist.
            </p>
            <p className="text-lg mb-6 transition-opacity hover:opacity-80"></p>
            <div className="text-center  border-t transition-border duration-500 ease-in-out border-gray-700 pt-8 flex flex-wrap justify-between items-center">
              <div className="flex-1 pr-6">
                <h3 className="text-2xl font-bold mb-4">Company Details:</h3>
                <ul className="text-lg space-y-3">
                  <li>Proud Nepal IT Suppliers Pvt. Ltd.</li>
                  <li>Dhobidhara Marg, Kathmandu, Nepal</li>
                  <li>+977 986-7174242</li>
                  <li>info@proudnepal.com</li>
                </ul>
                <div>
                  <div className="my-5">
                    <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                      Connect
                    </h3>
                    <ul className=" flex items-center gap-2 text-2xl justify-center">
                      <li className="mr-4 hover:bg-sky-500 hover:cursor-pointer p-2 rounded-lg transition-all ease-in">
                        <a
                          href="https://www.facebook.com/proudnepalitsuppliers"
                          target="_blank"
                        >
                          {" "}
                          <Facebook />
                        </a>
                      </li>

                      <li className="mr-4 hover:bg-sky-500 hover:cursor-pointer p-2 rounded-lg transition-all ease-in">
                        <a
                          href="https://www.instagram.com/proudnepalit/"
                          target="_blank"
                        >
                          {" "}
                          <Instagram />
                        </a>
                      </li>
                      <li className="mr-4 hover:bg-sky-500 hover:cursor-pointer p-2 rounded-lg transition-all ease-in">
                        <a
                          href="https://www.tiktok.com/@shyamlalregmi5"
                          target="_blank"
                        >
                          <Music2 />{" "}
                        </a>
                      </li>

                      <li className="mr-4 hover:bg-sky-500 hover:cursor-pointer p-2 rounded-lg transition-all ease-in">
                        <a
                          href="https://www.youtube.com/@proudnepalitsupplierspvtltd"
                          target="_blank"
                        >
                          <Youtube />{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:pl-6  my-10">
                <p className="mb-2 text-left">
                  <p>Reach Us At:</p>
                </p>
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="250px"
                      height="250px"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=Proud Nepal It Suppliers&t=&z=10&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      title="Proud Nepal IT Suppliers Map"
                    ></iframe>
                    <a href="https://2yu.co"></a>
                    <br />
                    <style jsx>{`
                      .mapouter {
                        position: relative;
                        text-align: right;
                        height: 100%;
                        width: 100%;
                      }

                      .gmap_canvas {
                        overflow: hidden;
                        background: none !important;
                        height: 100%;
                        width: 100%;
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
