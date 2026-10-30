const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const navItems = document.querySelectorAll(".nav-item");

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const setActiveNavItem = (sectionId) => {
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.section === sectionId));
};

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNavItem(entry.target.id);
      });
    },
    { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
  );

  navItems.forEach((item) => {
    const section = document.querySelector(`#${item.dataset.section}`);
    if (section) sectionObserver.observe(section);
  });
}

const updateHeaderState = () => {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projectCards.forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const copyLinkButton = document.querySelector(".copy-link");
if (copyLinkButton) {
  copyLinkButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyLinkButton.dataset.link);
      copyLinkButton.classList.add("is-copied");
      copyLinkButton.innerHTML = "Copied GitHub link <span>✓</span>";
      window.setTimeout(() => {
        copyLinkButton.classList.remove("is-copied");
        copyLinkButton.innerHTML = "Copy GitHub link <span>⧉</span>";
      }, 2200);
    } catch (error) {
      console.warn("The GitHub link could not be copied.", error);
    }
  });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const repoCount = document.querySelector("#repo-count");
const repoCountSummary = document.querySelector("#repo-count-summary");
const followerCount = document.querySelector("#follower-count");
const latestReposList = document.querySelector("#latest-repos-list");
const repoStatus = document.querySelector("#repo-status");
const heroArt = document.querySelector(".hero-art");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroArt && !reducedMotion.matches) {
  heroArt.addEventListener("pointermove", (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty("--tilt-x", `${y * -10}deg`);
    heroArt.style.setProperty("--tilt-y", `${x * 12}deg`);
  });

  heroArt.addEventListener("pointerleave", () => {
    heroArt.style.setProperty("--tilt-x", "0deg");
    heroArt.style.setProperty("--tilt-y", "0deg");
  });
}

fetch("https://api.github.com/users/sumit957602", {
  headers: { Accept: "application/vnd.github+json" },
})
  .then((response) => {
    if (!response.ok) throw new Error("GitHub profile unavailable");
    return response.json();
  })
  .then((profile) => {
    repoCount.textContent = profile.public_repos;
    repoCountSummary.textContent = profile.public_repos;
    followerCount.textContent = profile.followers;
  })
  .catch((error) => {
    console.warn("GitHub profile stats could not be refreshed.", error);
  });

fetch("https://api.github.com/users/sumit957602/repos?sort=updated&per_page=3", {
  headers: { Accept: "application/vnd.github+json" },
})
  .then((response) => {
    if (!response.ok) throw new Error("GitHub repositories unavailable");
    return response.json();
  })
  .then((repositories) => {
    latestReposList.replaceChildren();
    repositories.forEach((repository) => {
      const link = document.createElement("a");
      link.className = "latest-repo";
      link.href = repository.html_url;
      link.target = "_blank";
      link.rel = "noreferrer";

      const name = document.createElement("strong");
      name.textContent = repository.name;
      const description = document.createElement("p");
      description.textContent = repository.description || "A public project from my GitHub profile.";
      const language = document.createElement("small");
      language.textContent = repository.language || "Repository";

      link.append(name, description, language);
      latestReposList.append(link);
    });
    repoStatus.textContent = "Updated from public profile";
  })
  .catch((error) => {
    repoStatus.textContent = "Explore the full profile for latest work";
    latestReposList.replaceChildren();
    console.warn("Latest GitHub repositories could not be loaded.", error);
  });
