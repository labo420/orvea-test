const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item[data-view]");
const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");

const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const mobileOverlay = document.getElementById("mobileOverlay");

const assistantPanel = document.getElementById("assistantPanel");
const closeAssistant = document.getElementById("closeAssistant");

const commandPalette = document.getElementById("commandPalette");
const commandInput = document.getElementById("commandInput");
const globalSearchButton = document.getElementById("globalSearchButton");

const viewNames = {
  dashboard: "Dashboard",
  projects: "Projects",
  inbox: "Inbox",
  changes: "What changed?",
  waiting: "What am I waiting for?",
  tasks: "Tasks",
  timeline: "Timeline",
  decisions: "Decision log",
  documents: "Documents"
};


function openView(viewName) {

  views.forEach((view) => {
    view.classList.remove("active-view");
  });

  const target = document.getElementById(`view-${viewName}`);

  if (target) {
    target.classList.add("active-view");
  }

  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.view === viewName
    );
  });

  breadcrumbCurrent.textContent =
    viewNames[viewName] || "Dashboard";

  closeMobileNavigation();
}


function closeMobileNavigation() {
  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("active");
}


navItems.forEach((item) => {

  item.addEventListener("click", () => {
    openView(item.dataset.view);
  });

});


document.querySelectorAll("[data-view-target]").forEach((button) => {

  button.addEventListener("click", () => {

    const target = button.dataset.viewTarget;

    if (!target) return;

    commandPalette.classList.remove("open");

    openView(target);

  });

});


/* ================= MOBILE MENU ================= */

openSidebar.addEventListener("click", () => {
  sidebar.classList.add("open");
  mobileOverlay.classList.add("active");
});

closeSidebar.addEventListener("click", closeMobileNavigation);

mobileOverlay.addEventListener("click", closeMobileNavigation);


/* ================= ASSISTANT ================= */

document.querySelectorAll(".assistant-trigger").forEach((button) => {

  button.addEventListener("click", () => {
    assistantPanel.classList.add("open");
  });

});

closeAssistant.addEventListener("click", () => {
  assistantPanel.classList.remove("open");
});


/* ================= COMMAND PALETTE ================= */

function openCommandPalette() {

  commandPalette.classList.add("open");

  setTimeout(() => {
    commandInput.focus();
  }, 50);
}


function closeCommandPalette() {

  commandPalette.classList.remove("open");

  commandInput.value = "";
}


globalSearchButton.addEventListener(
  "click",
  openCommandPalette
);


commandPalette.addEventListener("click", (event) => {

  if (event.target === commandPalette) {
    closeCommandPalette();
  }

});


commandInput.addEventListener("input", () => {

  const query = commandInput.value.trim().toLowerCase();

  const buttons =
    commandPalette.querySelectorAll(
      ".command-results button"
    );

  buttons.forEach((button) => {

    const text =
      button.textContent.toLowerCase();

    button.style.display =
      !query || text.includes(query)
        ? "flex"
        : "none";

  });

});


document.addEventListener("keydown", (event) => {

  if (
    (event.metaKey || event.ctrlKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    openCommandPalette();

  }

  if (event.key === "Escape") {

    closeCommandPalette();

    assistantPanel.classList.remove("open");

  }

});


/* ================= TODAY CHECKBOXES ================= */

document.querySelectorAll(".today-check").forEach((checkbox) => {

  checkbox.addEventListener("click", () => {

    checkbox.classList.toggle("checked");

    if (checkbox.classList.contains("checked")) {
      checkbox.style.background = "#17945b";
      checkbox.style.borderColor = "#17945b";
    } else {
      checkbox.style.background = "white";
      checkbox.style.borderColor = "#cfd4dc";
    }

  });

});


/* ================= TASK CHECKBOXES ================= */

document.querySelectorAll(".task-check").forEach((checkbox) => {

  checkbox.addEventListener("click", () => {

    const task = checkbox.closest(".task-item");

    checkbox.classList.toggle("checked");

    if (checkbox.classList.contains("checked")) {

      checkbox.style.background = "#17945b";
      checkbox.style.borderColor = "#17945b";

      task.style.opacity = ".55";

    } else {

      checkbox.style.background = "white";
      checkbox.style.borderColor = "#cfd4dc";

      task.style.opacity = "1";

    }

  });

});


/* ================= FILTER BUTTONS ================= */

document.querySelectorAll(".filter").forEach((filter) => {

  filter.addEventListener("click", () => {

    document
      .querySelectorAll(".filter")
      .forEach((item) => {
        item.classList.remove("active");
      });

    filter.classList.add("active");

  });

});


/* ================= DEMO PROJECT CLICK ================= */

document.querySelectorAll(".project-card").forEach((project) => {

  project.addEventListener("click", () => {

    openView("projects");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* ================= FAKE ASSISTANT PROMPTS ================= */

document.querySelectorAll(".suggested-prompts button")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const input =
        document.querySelector(".assistant-input input");

      input.value = button.textContent.trim();

      input.focus();

    });

  });


/* ================= INITIAL STATE ================= */

openView("dashboard");
