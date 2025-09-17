// feat(performance): Web Vitals and Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    this.init();
  }

  init() {
    if (this.isDev) {
      this.loadWebVitals();
      this.monitorPerformance();
    }
  }

  async loadWebVitals() {
    try {
      // Load web-vitals library dynamically
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import(
        "https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.js"
      );

      // Measure Core Web Vitals
      getCLS(this.logMetric.bind(this));
      getFID(this.logMetric.bind(this));
      getFCP(this.logMetric.bind(this));
      getLCP(this.logMetric.bind(this));
      getTTFB(this.logMetric.bind(this));
    } catch (error) {
      console.warn("Failed to load web-vitals:", error);
    }
  }

  logMetric(metric) {
    if (this.isDev) {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      });
    }
  }

  monitorPerformance() {
    // Monitor resource loading
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (this.isDev) {
            console.log(`[Performance] ${entry.entryType}:`, {
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });

      try {
        observer.observe({ entryTypes: ["navigation", "resource", "paint"] });
      } catch (error) {
        console.warn("PerformanceObserver not supported:", error);
      }
    }
  }
}

// feat(performance): Image Optimization
class ImageOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalImages();
  }

  lazyLoadImages() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove("lazy");
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  preloadCriticalImages() {
    // Preload hero image
    const heroImg = document.querySelector(".home__product-img");
    if (heroImg) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = heroImg.src;
      document.head.appendChild(link);
    }

    // Preload first few product images
    const productImgs = document.querySelectorAll(".featured__product-img");
    productImgs.forEach((img, index) => {
      if (index < 3) {
        // Only preload first 3
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = img.src;
        document.head.appendChild(link);
      }
    });
  }
}

// feat(performance): Font Optimization
class FontOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeFontLoading();
  }

  optimizeFontLoading() {
    // Add font-display: swap to Google Fonts
    const googleFontsLink = document.querySelector(
      'link[href*="fonts.googleapis.com"]'
    );
    if (googleFontsLink) {
      googleFontsLink.href = googleFontsLink.href.replace(
        "display=swap",
        "display=swap"
      );
    }

    // Preload critical fonts
    const criticalFonts = [
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
    ];

    criticalFonts.forEach((fontUrl) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = fontUrl;
      link.onload = function () {
        this.rel = "stylesheet";
      };
      document.head.appendChild(link);
    });
  }
}

// feat(performance): Script Optimization
class ScriptOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeScriptLoading();
  }

  optimizeScriptLoading() {
    // Load non-critical scripts after page load
    window.addEventListener("load", () => {
      // Load analytics or other non-critical scripts here
      this.loadAnalytics();
    });
  }

  loadAnalytics() {
    // Placeholder for analytics loading
    // This would load Google Analytics, etc. after page load
    console.log("[Performance] Loading analytics after page load");
  }
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", () => {
  new PerformanceMonitor();
  new ImageOptimizer();
  new FontOptimizer();
  new ScriptOptimizer();
});

// Export for manual initialization
window.PerformanceMonitor = PerformanceMonitor;
window.ImageOptimizer = ImageOptimizer;
window.FontOptimizer = FontOptimizer;
window.ScriptOptimizer = ScriptOptimizer;
