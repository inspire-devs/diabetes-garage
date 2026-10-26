import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import resources from "./data/resources.json";
import { news } from "./data/news.js";

const registerUrl = "https://dgworkshop.questionpro.com/";
const referralUrl =
  "https://utep.questionpro.com/a/TakeSurvey?tt=YhSZqDjm4Q0%3D";
const media = (name) => `/media/${name}`;

const workshops = [
  {
    week: "01",
    title: "Diabetes management",
    time: "Health assessment + workshop",
    topics: [
      "Understand your body and diabetes",
      "Recognize signs and symptoms",
      "Learn what your gauges mean",
    ],
  },
  {
    week: "02",
    title: "Living well",
    time: "Two-hour workshop",
    topics: [
      "Build physical activity into daily life",
      "Manage stress",
      "Keep moving forward",
    ],
  },
  {
    week: "03",
    title: "Maintenance & prevention",
    time: "Two-hour workshop",
    topics: [
      "Understand medication use",
      "Prevent complications",
      "Make the most of doctor visits",
    ],
  },
  {
    week: "04",
    title: "Eating well",
    time: "Health assessment + workshop",
    topics: [
      "Make nutrition work for you",
      "Bring family and friends",
      "Celebrate graduation",
    ],
  },
];

const gauges = [
  {
    icon: "icon-drop.svg",
    title: "Blood sugar",
    detail: "Check your levels and learn what your readings mean.",
  },
  {
    icon: "icon-run.svg",
    title: "Movement",
    detail: "Find ways to make physical activity part of your routine.",
  },
  {
    icon: "icon-stress.svg",
    title: "Stress",
    detail: "Notice stressors and build healthy ways to cope.",
  },
  {
    icon: "icon-plate.svg",
    title: "Food & water",
    detail: "Plan balanced meals and stay hydrated.",
  },
  {
    icon: "icon-pill.svg",
    title: "Medication",
    detail: "Know when and how to take your medication.",
  },
  {
    icon: "icon-heart.svg",
    title: "Blood pressure",
    detail: "Keep track of your blood pressure with your care team.",
  },
];

const categories = [
  ...new Set(resources.map((item) => item.category).filter(Boolean)),
].sort();
const locations = [
  ...new Set(resources.map((item) => item.level).filter(Boolean)),
].sort();

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function safeWebsite(value) {
  if (!value) return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    );
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = () => {
      if (
        window.google?.translate &&
        !document.querySelector("#google_translate_element select")
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element",
        );
      }
    };
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className="translate-control">
      <span>Language</span>
      <div id="google_translate_element" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            A free diabetes management program for men and their families
          </span>
          <div className="topbar-right">
            <GoogleTranslate />
            <a href="tel:+19157478377">Questions? 915-747-8377</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-shell">
          <Link className="brand" to="/" aria-label="The Diabetes Garage home">
            <img src={media("logo.png")} alt="The Diabetes Garage" />
            <span>
              THE DIABETES
              <br />
              <strong>GARAGE</strong>
            </span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            id="primary-nav"
            className={open ? "nav-links is-open" : "nav-links"}
            aria-label="Main navigation"
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/directory">Resource directory</NavLink>
            <NavLink to="/news">News & updates</NavLink>
            <a href="#education" onClick={() => setOpen(false)}>
              Education
            </a>
            <ExternalLink href={referralUrl} className="nav-referral">
              Provider referral
            </ExternalLink>
            <ExternalLink
              href={registerUrl}
              className="button button-orange nav-cta"
            >
              Register for a workshop <span aria-hidden="true">↗</span>
            </ExternalLink>
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer" id="education">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" to="/">
            THE DIABETES
            <br />
            GARAGE<span>®</span>
          </Link>
          <p>Practical diabetes education, built around real life.</p>
          <a href="mailto:diabetesgarage@utep.edu">diabetesgarage@utep.edu</a>
          <br />
          <a href="tel:+19157478377">915-747-8377</a>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/directory">Resource directory</Link>
          <Link to="/news">News & updates</Link>
          <ExternalLink href={referralUrl}>Provider referral</ExternalLink>
        </div>
        <div>
          <h3>Educational information</h3>
          <a
            href={media("Diabetes_and_Eye_Disease.pdf")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Diabetes & eye disease ↗
          </a>
          <a
            href={media("Diabetes_and_Sex.pdf")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Diabetes & sex ↗
          </a>
          <ExternalLink href="https://youtu.be/6vYEl-pZxB0">
            World Diabetes Day video ↗
          </ExternalLink>
        </div>
        <div className="footer-action">
          <span className="eyebrow">Ready to begin?</span>
          <h3>Pull into the garage.</h3>
          <p>
            Join a free series of workshops designed for men and their families.
          </p>
          <ExternalLink href={registerUrl} className="button button-orange">
            Register for free <span aria-hidden="true">↗</span>
          </ExternalLink>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} The Diabetes Garage. All rights reserved.
        </span>
        <span>Created with the University of Texas at El Paso</span>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={light ? "section-heading light" : "section-heading"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div
          className="hero-photo"
          role="img"
          aria-label="Diabetes Garage program"
        />
        <div className="container hero-content">
          <span className="hero-kicker">
            <span className="kicker-line" />
            FREE WORKSHOPS · REAL-WORLD TOOLS
          </span>
          <h1>
            Don’t let diabetes <em>break you down.</em>
          </h1>
          <p>
            Learn to manage diabetes with the same confidence you bring to
            caring for your car. The Diabetes Garage makes the information
            practical, memorable, and easier to use every day.
          </p>
          <div className="hero-actions">
            <ExternalLink href={registerUrl} className="button button-orange">
              Register for free workshops <span aria-hidden="true">↗</span>
            </ExternalLink>
            <a className="hero-secondary" href="#how-it-works">
              Explore the program <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="note-icon">✓</span>
            <span>
              For men and their families
              <br />
              <strong>Four weekly workshops</strong>
            </span>
          </div>
        </div>
        <div className="hero-side-label">YOUR HEALTH. YOUR ROAD AHEAD.</div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip-inner">
          <div>
            <span className="eyebrow">THE PROGRAM</span>
            <strong>Four weeks to build your toolkit.</strong>
          </div>
          <p>
            Learn the essentials, ask questions, and leave with a plan that fits
            your life.
          </p>
          <a href="#how-it-works">
            See what’s covered <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="section workshops-section" id="how-it-works">
        <div className="container">
          <SectionHeading
            eyebrow="THE FOUR-WEEK SERIES"
            title="A tune-up for the road ahead."
            text="Each workshop connects diabetes care to familiar ideas from vehicle maintenance. Attend the full series to put the pieces together."
          />
          <div className="workshop-grid">
            {workshops.map((workshop) => (
              <article className="workshop-card" key={workshop.week}>
                <div className="workshop-top">
                  <span>WEEK {workshop.week}</span>
                  <span className="week-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3>{workshop.title}</h3>
                <p className="workshop-time">{workshop.time}</p>
                <ul>
                  {workshop.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="workshop-footnote">
            Workshops are free. Family and friends are welcome at the graduation
            session.
          </p>
        </div>
      </section>

      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-image">
            <img src={media("human.svg")} alt="Illustration of a person" />
            <span className="about-tag">BUILT FOR REAL LIFE</span>
          </div>
          <div className="about-copy">
            <span className="eyebrow">WHAT IS THE DIABETES GARAGE?</span>
            <h2>
              Clear information.
              <br />
              <em>More confidence.</em>
            </h2>
            <p>
              When you’re diagnosed with diabetes, there can be a lot to take
              in. The Diabetes Garage organizes the essentials into four weekly
              workshops using vehicle care as a familiar guide.
            </p>
            <div className="about-points">
              <div>
                <span>01</span>
                <p>
                  Understand the signs, symptoms, and everyday choices that
                  affect your health.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  Talk with diabetes educators and get answers to your
                  questions.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  Build habits and a support system you can keep using after the
                  program.
                </p>
              </div>
            </div>
            <div className="about-callout">
              <img src={media("toolbox.png")} alt="Diabetes care toolbox" />
              <p>
                Complete the workshops and receive a free diabetes care toolbox.{" "}
                <small>Contents may vary.</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section gauges-section">
        <div className="container">
          <SectionHeading
            eyebrow="CHECK YOUR GAUGES"
            title="Know what to keep an eye on."
            text="Like a dashboard, your body gives you useful signals. The program helps you understand them and talk with your care team."
            light
          />
          <div className="gauge-grid">
            {gauges.map((gauge) => (
              <article className="gauge-card" key={gauge.title}>
                <img src={media(gauge.icon)} alt="" />
                <h3>{gauge.title}</h3>
                <p>{gauge.detail}</p>
              </article>
            ))}
          </div>
          <div className="gauge-bottom">
            <span>Learn more with the full program</span>
            <ExternalLink href={registerUrl}>
              Join a workshop <span aria-hidden="true">↗</span>
            </ExternalLink>
          </div>
        </div>
      </section>

      <section className="section resource-promo">
        <div className="container resource-promo-grid">
          <div>
            <span className="eyebrow">BEYOND THE WORKSHOP</span>
            <h2>Find help for the everyday stuff.</h2>
            <p>
              Explore resources for diabetes care, food, housing, insurance,
              stress, and more. Search by topic or location.
            </p>
            <Link to="/directory" className="button button-dark">
              Explore the resource directory <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="resource-promo-card">
            <div className="promo-search">
              <span aria-hidden="true">⌕</span> Search for support...
            </div>
            <div className="promo-tags">
              <span>Diabetes care</span>
              <span>Food</span>
              <span>Housing</span>
              <span>Stress</span>
              <span>Insurance</span>
            </div>
            <div className="promo-count">
              <strong>{resources.length}</strong>
              <span>
                resources
                <br />
                in the directory
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section stories-section">
        <div className="container">
          <div className="stories-heading">
            <SectionHeading
              eyebrow="IN THE NEWS"
              title="Stories from the garage."
            />
            <Link to="/news">
              All news & updates <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <NewsCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="container video-grid">
          <div>
            <span className="eyebrow">SEE THE PROGRAM IN ACTION</span>
            <h2>There’s a better way to learn about diabetes.</h2>
            <p>Hear more about the program and the people behind it.</p>
            <ExternalLink
              href="https://youtu.be/g_ZT7ry-Ie0"
              className="button button-outline"
            >
              Watch on YouTube <span aria-hidden="true">↗</span>
            </ExternalLink>
          </div>
          <div className="video-wrap">
            <iframe
              src="https://www.youtube-nocookie.com/embed/g_ZT7ry-Ie0"
              title="The Diabetes Garage program video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function Directory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () =>
      resources.filter((item) => {
        const matchesQuery =
          !query ||
          [
            item.title,
            item.description,
            item.category,
            item.level,
            item.type_of_diabetes_resource,
            item.type_everyday_living_resource,
            item.type_of_coping_well_resource,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase());
        return (
          matchesQuery &&
          (category === "all" || item.category === category) &&
          (location === "all" || item.level === location)
        );
      }),
    [query, category, location],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / 12));
  const visible = filtered.slice((page - 1) * 12, page * 12);
  const update = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };
  const clear = () => {
    setQuery("");
    setCategory("all");
    setLocation("all");
    setPage(1);
  };

  return (
    <>
      <PageHero
        eyebrow="FIND YOUR SUPPORT"
        title="Resource directory"
        text="Practical resources for diabetes care and everyday life. Search by name, topic, or location to find a place to start."
      />
      <main className="directory-section">
        <div className="container">
          <div className="directory-intro">
            <p>
              This directory brings together resources in El Paso, Harlingen,
              San Antonio, across Texas, and beyond. Listings are provided for
              educational and informational purposes.
            </p>
            <div>
              <strong>{resources.length}</strong>
              <span>
                resources
                <br />
                to explore
              </span>
            </div>
          </div>
          <div className="directory-layout">
            <aside className="filter-panel" aria-label="Filter resources">
              <h2>Find a resource</h2>
              <label htmlFor="resource-search">Search</label>
              <input
                id="resource-search"
                type="search"
                placeholder="What are you looking for?"
                value={query}
                onChange={update(setQuery)}
              />
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={category}
                onChange={update(setCategory)}
              >
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <label htmlFor="location-filter">Location</label>
              <select
                id="location-filter"
                value={location}
                onChange={update(setLocation)}
              >
                <option value="all">All locations</option>
                {locations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <button type="button" className="clear-filters" onClick={clear}>
                Clear filters <span aria-hidden="true">↺</span>
              </button>
            </aside>
            <div className="directory-results">
              <div className="results-heading">
                <div>
                  <span className="eyebrow">RESOURCE LIST</span>
                  <h2>
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "resource" : "resources"} found
                  </h2>
                </div>
                <span>
                  Showing {filtered.length ? (page - 1) * 12 + 1 : 0}–
                  {Math.min(page * 12, filtered.length)} of {filtered.length}
                </span>
              </div>
              {visible.length ? (
                <div className="resource-list">
                  {visible.map((item, index) => (
                    <ResourceCard item={item} key={`${item.title}-${index}`} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No matching resources</h3>
                  <p>Try a different search or remove a filter.</p>
                  <button
                    type="button"
                    className="button button-dark"
                    onClick={clear}
                  >
                    Clear filters
                  </button>
                </div>
              )}
              {pageCount > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ← Previous
                  </button>
                  <span>
                    Page {page} of {pageCount}
                  </span>
                  <button
                    type="button"
                    disabled={page === pageCount}
                    onClick={() => setPage(page + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="directory-disclaimer">
            Directory information comes from an archived site export and may
            have changed. Confirm details directly with each organization.
          </p>
        </div>
      </main>
    </>
  );
}

function ResourceCard({ item }) {
  const website = safeWebsite(item.website);
  const subtype =
    item.type_of_diabetes_resource ||
    item.type_everyday_living_resource ||
    item.type_of_coping_well_resource;
  return (
    <article className="resource-card">
      <div className="resource-meta">
        <span>{item.category}</span>
        {item.level && <span>{item.level}</span>}
      </div>
      <h3>{item.title}</h3>
      {subtype && <p className="resource-subtype">{subtype}</p>}
      {item.description && (
        <p className="resource-description">{item.description}</p>
      )}
      <div className="resource-actions">
        {item.phone && (
          <a href={`tel:${item.phone.replace(/[^+\d]/g, "")}`}>
            Call {item.phone} <span aria-hidden="true">↗</span>
          </a>
        )}
        {item.email && (
          <a href={`mailto:${item.email}`}>
            Email <span aria-hidden="true">↗</span>
          </a>
        )}
        {website && (
          <ExternalLink href={website}>
            Visit website <span aria-hidden="true">↗</span>
          </ExternalLink>
        )}
      </div>
    </article>
  );
}

function NewsCard({ item }) {
  return (
    <article className="news-card">
      <div className="news-card-meta">
        <span>{item.source}</span>
        <span>{item.date}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <ExternalLink href={item.url}>
        Read the story <span aria-hidden="true">↗</span>
      </ExternalLink>
    </article>
  );
}

function News() {
  const [query, setQuery] = useState("");
  const filtered = news.filter((item) =>
    `${item.title} ${item.description} ${item.source}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="LATEST STORIES"
        title="News & updates"
        text="Stories about the people, partnerships, and ideas moving diabetes education forward."
      />
      <main className="section news-page">
        <div className="container">
          <div className="news-page-heading">
            <div>
              <span className="eyebrow">FROM THE ARCHIVE</span>
              <h2>In the news</h2>
            </div>
            <label className="news-search">
              <span className="sr-only">Search news</span>
              <input
                type="search"
                placeholder="Search stories"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          {filtered.length ? (
            <div className="news-grid">
              {filtered.map((item) => (
                <NewsCard item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No stories found</h3>
              <p>Try another search term.</p>
            </div>
          )}
          <p className="archive-note">
            These stories were preserved from the original website’s June 2023
            backup.
          </p>
        </div>
      </main>
    </>
  );
}

function NotFound() {
  return (
    <main className="not-found container">
      <span className="eyebrow">404 · WRONG TURN</span>
      <h1>That page isn’t here.</h1>
      <p>Let’s get you back on the road.</p>
      <Link className="button button-orange" to="/">
        Return home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
