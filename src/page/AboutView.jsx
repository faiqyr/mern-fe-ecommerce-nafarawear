import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import customAPI from "../api";

export const AboutView = () => {
  // Animation variants for consistency
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const [stats, setStats] = useState({ users: 0, products: 0, sold: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await customAPI.get("/stats"); // Path to your new endpoint
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="min-h-screen bg-base-200 py-10 px-5 overflow-hidden">
      {/* 1. Hero Section with Slide In */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="hero bg-base-100 rounded-box shadow-xl p-10 mb-10"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            src="/LOGO NAFARA.png"
            className="max-w-sm rounded-lg w-80"
            alt="About us"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Nafara Wear{" "}
              <span className="text-primary bg-clip-text from-primary to-secondary">
                E-Commerce
              </span>
            </h1>
            <p className="py-6 text-lg">
              Welcome to our platform. We provide the highest quality products
              with secure Midtrans payments and premium local craftsmanship.
            </p>
            <Link
              to="/products"
              className="btn btn-primary hover:scale-105 transition-transform"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 2. Stats Section with Real-time Count */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="flex justify-center mb-10"
      >
        <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100 w-full">
          {/* Stat 1 */}
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Downloads</div>
            <div className="stat-value text-primary">
              <CountUp end={31000} duration={2.5} separator="," suffix="+" />
            </div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          {/* Stat 2 */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m14 4a2 2 0 100-4m0 4a2 2 0 110-4m-7 1h1m8 0h1m-18 0h1"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value text-secondary">
              <CountUp
                end={112}
                duration={3}
                separator=","
                preserveValue={true}
              />
            </div>
            <div className="stat-desc">Joined our community</div>
          </div>

          {/* Stat 3 */}
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Products Sold</div>
            <div className="stat-value text-accent">
              <CountUp end={1200} duration={2} suffix="+" />
            </div>
            <div className="stat-desc">Across Indonesia</div>
          </div>
        </div>
      </motion.div>

      {/* 3. Our Journey (Timeline) with Staggered Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8 italic">
          Our Journey
        </h2>
        <ul className="timeline timeline-vertical lg:timeline-horizontal">
          <TimelineItem year="2025" text="Launching" active />
          <TimelineItem year="Now" text="Digital Marketing" active />
          <TimelineItem year="2026" text="Market Leader" />
        </ul>
      </motion.div>
    </div>
  );
};

// Sub-component for cleaner timeline code
const TimelineItem = ({ year, text, active = false }) => (
  <li>
    {active && <hr className="bg-primary" />}
    <div
      className={
        active
          ? "timeline-start timeline-box border-primary"
          : "timeline-start timeline-box"
      }
    >
      {year}: {text}
    </div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`w-5 h-5 ${active ? "text-primary" : "text-base-300"}`}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.13-5.68z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    {active && <hr className="bg-primary" />}
  </li>
);
