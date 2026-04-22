"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    code: "+91",
    phone: "",
    country: "India",
    state: "",
    seller: "",
    manager: "",
    brand: "",
    asins: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        triggerDownload();
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/amazon-ads.pdf";
    link.download = "amazon-ads-guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className={styles.mainWrapper}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/logo22.webp" alt="Learn Amazon Ads Logo" style={{ height: "50px", width: "auto" }} />
        </div>
      </header>
      <div className={styles.container}>
        {/* LEFT SECTION */}
      <section className={styles.leftSection}>
        <h1 className={styles.heading}>Learn Amazon Ads FREE</h1>
        <ul className={styles.subtextList}>
          <li>Master Amazon PPC strategies</li>
          <li>Lower your ACoS & boost sales</li>
          <li>Step-by-step beginner guide</li>
          <li>Proven frameworks for success</li>
        </ul>
        <div className={styles.visualCta}>Grab Your Free PDF Guide 👇</div>
      </section>

      {/* RIGHT SECTION */}
      <section className={styles.rightSection}>
        <div className={styles.formContainer}>
          {success ? (
            <div className={styles.successMessage}>
              <h3>Success! 🎉</h3>
              <p>Your PDF is downloading now. Check your downloads folder.</p>
              <button 
                className={styles.visualCta} 
                onClick={() => window.location.reload()}
                style={{ cursor: 'pointer', marginTop: '1rem' }}
              >
                Go Back
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className={styles.formTitle}>Where should we send it?</h2>
              
              {error && <p className={styles.errorText} style={{ textAlign: "center", marginBottom: "1rem" }}>{error}</p>}

              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className={styles.inputField}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className={styles.inputField}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>WhatsApp Number *</label>
                <div className={styles.phoneGroup}>
                  <select
                    name="code"
                    className={styles.inputField}
                    value={formData.code}
                    onChange={handleChange}
                    style={{ width: "120px" }}
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (AE)</option>
                    <option value="+61">+61 (AU)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className={styles.inputField}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9999999999"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Country *</label>
                <select
                  name="country"
                  required
                  className={styles.inputField}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>State / Location</label>
                <input
                  type="text"
                  name="state"
                  className={styles.inputField}
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              {/* QUALIFICATION FIELDS */}
              <div className={styles.formGroup}>
                <label>Are you an existing Amazon Seller?</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="seller" value="Yes" onChange={handleChange} /> Yes
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="seller" value="No" onChange={handleChange} /> No
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Who manages your ads?</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="manager" value="Self" onChange={handleChange} /> Self
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="manager" value="Staff" onChange={handleChange} /> Staff
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="manager" value="Third Party" onChange={handleChange} /> Third Party
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Are you a Brand Owner?</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="brand" value="Yes" onChange={handleChange} /> Yes
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="brand" value="No" onChange={handleChange} /> No
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>ASINs (Optional, comma separated)</label>
                <input
                  type="text"
                  name="asins"
                  className={styles.inputField}
                  value={formData.asins}
                  onChange={handleChange}
                  placeholder="e.g. B08N5WRWNW, B08N5WRWNW"
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Submitting..." : "Submit & Download PDF"}
              </button>
            </form>
          )}
        </div>
      </section>
      </div>
    </main>
  );
}
