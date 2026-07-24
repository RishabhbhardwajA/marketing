"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import ServiceCard from "@/components/ServiceCard";

const statsData = [
  { prefix: "", target: 312, suffix: "%", context: "Organic Growth", client: "SaaS Enterprise" },
  { prefix: "", target: 4, suffix: ".7x", context: "ROAS Multiplier", client: "E-commerce Brand" },
  { prefix: "-", target: 58, suffix: "%", context: "CAC Reduction", client: "Fintech Startup" }
];

const testimonialsData = [
  { quote: "NorthPeak didn't just improve our metrics; they rebuilt our entire acquisition engine from scratch. Our CAC dropped by 40% in quarter one.", name: "Sarah Jenkins", role: "CMO, TechFlow", avatar: "/img/avatar.png" },
  { quote: "Most agencies show you dashboards. NorthPeak showed us how to act on them. That's the difference.", name: "Priya Malhotra", role: "VP Marketing, ShipFast" }
];

const pricingData = [
  { title: "Growth", desc: "For scaling brands.", price: "₹4,99,000", period: "/month", features: ["4 marketing channels", "Advanced analytics & attribution", "Weekly strategy calls", "Dedicated account manager"], buttonText: "Select Plan", btnClass: "btn-outline", featured: false },
  { title: "Custom", badge: "Enterprise", desc: "For established industry leaders.", price: "Tailored", period: "", features: ["All channels — paid, organic, email", "Custom data infrastructure", "Executive reporting & QBRs", "SLA guarantees"], buttonText: "Talk to Sales", btnClass: "btn-primary", featured: true }
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // ── Text Splitting (Blur Reveal) ──
    function splitText(el: HTMLElement) {
      let html = "";
      let i = 0;
      Array.from(el.childNodes).forEach((node) => {
        if (node.nodeType === 3 && node.textContent) {
          node.textContent.split(" ").forEach((word, index, arr) => {
            html += `<span style="display: inline-block; white-space: nowrap;">`;
            word.split("").forEach((ch) => {
              html += `<span class="ai-char" style="--i:${i++}">${ch}</span>`;
            });
            html += `</span>`;
            if (index < arr.length - 1) {
              html += `<span class="ai-char" style="--i:${i++}">&nbsp;</span>`;
            }
          });
        } else if (node.nodeType === 1) {
          const element = node as HTMLElement;
          const tag = element.tagName.toLowerCase();
          const cls = element.className ? ` class="${element.className}"` : "";
          html += `<${tag}${cls}>`;
          if (element.textContent) {
            element.textContent.split(" ").forEach((word, index, arr) => {
              html += `<span style="display: inline-block; white-space: nowrap;">`;
              word.split("").forEach((ch) => {
                html += `<span class="ai-char" style="--i:${i++}">${ch}</span>`;
              });
              html += `</span>`;
              if (index < arr.length - 1) {
                html += `<span class="ai-char" style="--i:${i++}">&nbsp;</span>`;
              }
            });
          }
          html += `</${tag}>`;
        }
      });
      el.innerHTML = html;
      el.dataset.split = "true";
    }

    // ── Scroll Reveal (Intersection Observer) ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if ((el.tagName === "H1" || el.tagName === "H2") && !el.dataset.split) {
              splitText(el);
            }
            el.classList.add("ai-active");
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll(".ai-observe").forEach((el) => {
      revealObserver.observe(el);
    });

    // ── Counter Animation ──
    const counterDone = new Set();
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counterDone.has(entry.target)) {
            counterDone.add(entry.target);
            const el = entry.target as HTMLElement;
            const targetStr = el.dataset.target;
            if (!targetStr) return;
            const target = parseInt(targetStr, 10);
            const duration = 1500;
            let startTime: number | null = null;

            function step(timestamp: number) {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * target).toString();
              if (progress < 1) requestAnimationFrame(step);
              else el.textContent = target.toString();
            }
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".counter").forEach((c) => {
      counterObserver.observe(c);
    });

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = "This field is required.";
    if (!email.trim()) {
      errors.email = "This field is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email.";
    }
    if (!message.trim()) errors.message = "This field is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormStatus("sending");
      setTimeout(() => {
        setFormStatus("success");
        e.currentTarget.reset();
        setTimeout(() => setFormStatus("idle"), 4000);
      }, 1000);
    } else {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 400); // Remove shake class after animation
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="section-number" aria-hidden="true">01</div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge ai-observe">
                <span className="pulse-dot"></span> V2.0 ENGINE LIVE
              </div>
              <h1 className="ai-observe">Growth Marketing Built for <span className="text-gradient">High-Stakes Brands.</span></h1>
              <p className="hero-sub ai-observe">We integrate SEO, paid media, and data science to build revenue engines that scale effortlessly. Stop switching agencies and start taking action.</p>
              <div className="hero-actions ai-observe fade-up-block">
                <a href="#contact" className="btn btn-primary group relative overflow-hidden">
                  <span className="relative z-10">Start Building Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a href="#results" className="btn btn-outline">View Our Results</a>
              </div>
              <div className="hero-trust ai-observe fade-up-block">
                <span className="trust-label">Trusted by startups backed by</span>
                <div className="trust-logos">
                  <span className="trust-logo">Y Combinator</span>
                  <span className="trust-logo">Sequoia</span>
                  <span className="trust-logo">a16z</span>
                </div>
              </div>
            </div>
            <div className="hero-visual ai-observe fade-up-block">
              <div className="image-wrapper">
                <img src="/img/hero_dashboard.png" alt="Marketing Dashboard Analytics" className="hero-image animate-float" loading="eager" />
                <div className="glass-metric gm-1">
                  <span className="gm-value">₹<span className="counter" data-target="1200">0</span>Cr+</span>
                  <span className="gm-label">Revenue Generated</span>
                </div>
                <div className="glass-metric gm-2">
                  <span className="gm-value"><span className="counter" data-target="4">0</span>x</span>
                  <span className="gm-label">Faster Scaling</span>
                </div>
                <div className="glass-metric gm-3">
                  <span className="gm-value"><span className="counter" data-target="99">0</span>%</span>
                  <span className="gm-label">Retention</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-border" id="services">
        <div className="section-number" aria-hidden="true">02</div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag ai-observe">Integrations</span>
            <h2 className="ai-observe ai-hover-target">Manage all marketing efforts in one place.</h2>
            <p className="section-desc ai-observe">Unify your marketing stack with enterprise-grade solutions.</p>
          </div>
          
          <div className="services-grid">
            <ServiceCard 
              title="Real-Time Analytics" 
              description="Track performance as it happens with zero latency dashboard updates." 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>} 
            />
            <ServiceCard 
              title="Enterprise Security" 
              description="SOC2 compliant infrastructure keeping your data safe and encrypted." 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} 
            />
            <ServiceCard 
              title="Search Architecture" 
              description="Deep technical SEO and content models that compound authority." 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>} 
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section section-border" id="results">
        <div className="section-number" aria-hidden="true">03</div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag ai-observe">Impact</span>
            <h2 className="ai-observe ai-hover-target">Predictable outcomes for ambitious teams.</h2>
          </div>
          
          <div className="stats-grid fade-up-block ai-observe">
            {statsData.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-number">
                  {stat.prefix}<span className="counter" data-target={stat.target}>0</span>{stat.suffix}
                </span>
                <span className="stat-context">{stat.context}</span>
                <span className="stat-client">{stat.client}</span>
              </div>
            ))}
          </div>

          <div className="test-grid">
            {testimonialsData.map((test, i) => (
              <article className="test-card fade-up-block ai-observe" key={i}>
                <div>
                  <p>&quot;{test.quote}&quot;</p>
                </div>
                <div className="test-author">
                  {test.avatar && <img src={test.avatar} alt={test.name} className="test-avatar" />}
                  <div>
                    <span className="test-name">{test.name}</span>
                    <span className="test-role">{test.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section section-border" id="pricing">
        <div className="section-number" aria-hidden="true">04</div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag ai-observe">Partnership</span>
            <h2 className="ai-observe ai-hover-target">Transparent models for scaling teams.</h2>
          </div>
          
          <div className="pricing-grid">
            {pricingData.map((plan, i) => (
              <div className={`pricing-card fade-up-block ai-observe ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
                <h3>{plan.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{plan.desc}</p>
                <span className="price">{plan.price} <span>{plan.period}</span></span>
                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${plan.btnClass}`}>{plan.buttonText}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section-border" id="contact">
        <div className="section-number" aria-hidden="true">05</div>
        <div className="container">
          <div className="contact-layout">
            <div>
              <span className="section-tag ai-observe">Connect</span>
              <h2 className="ai-observe ai-hover-target">Let&apos;s build your growth engine.</h2>
              <p className="ai-observe" style={{ color: "var(--text-secondary)", marginTop: "16px" }}>We typically respond within hours, not days.</p>
            </div>
            
            <form className={`contact-form fade-up-block ai-observe ${formStatus === "error" ? "shake" : ""}`} id="contact-form" noValidate onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" id="form-name" name="name" style={{ borderColor: formErrors.name ? "#ef4444" : "" }} required placeholder=" " />
                <label htmlFor="form-name">Full Name</label>
                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <input type="email" id="form-email" name="email" style={{ borderColor: formErrors.email ? "#ef4444" : "" }} required placeholder=" " />
                <label htmlFor="form-email">Email Address</label>
                {formErrors.email && <span className="form-error">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <textarea id="form-message" name="message" rows={4} style={{ borderColor: formErrors.message ? "#ef4444" : "" }} required placeholder=" "></textarea>
                <label htmlFor="form-message">Project Details</label>
                {formErrors.message && <span className="form-error">{formErrors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending..." : "Submit Request"}
              </button>
              {formStatus === "success" && (
                <div className="form-success" style={{ display: "block" }}>Message received. We&apos;ll be in touch.</div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
