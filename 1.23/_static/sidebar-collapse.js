(function () {
  const storageKey = "qaic-sidebar-collapsed";
  let sidebarButton;

  function isCollapsed() {
    return document.body.classList.contains("qaic-sidebar-collapsed");
  }

  function updateButton() {
    if (!sidebarButton) {
      return;
    }

    const collapsed = isCollapsed();
    const label = collapsed ? "Expand navigation" : "Collapse navigation";

    sidebarButton.setAttribute("aria-expanded", collapsed ? "false" : "true");
    sidebarButton.setAttribute("aria-label", label);
    sidebarButton.title = label;
  }

  function setCollapsed(collapsed) {
    document.body.classList.toggle("qaic-sidebar-collapsed", collapsed);
    try {
      window.localStorage.setItem(storageKey, collapsed ? "true" : "false");
    } catch (error) {
      // Ignore storage failures, such as private browsing restrictions.
    }
    updateButton();
  }

  function getInitialState() {
    try {
      return window.localStorage.getItem(storageKey) === "true";
    } catch (error) {
      return false;
    }
  }

  function addSidebarToggle() {
    const sidebar = document.querySelector(".md-sidebar--primary .md-sidebar__inner");
    if (!sidebar) {
      return;
    }

    sidebarButton = sidebar.querySelector(".qaic-sidebar-toggle");
    if (!sidebarButton) {
      sidebarButton = document.createElement("button");
      sidebarButton.type = "button";
      sidebarButton.className = "qaic-sidebar-toggle";
      sidebarButton.setAttribute("aria-controls", "__drawer");
      sidebarButton.addEventListener("click", function () {
        setCollapsed(!isCollapsed());
      });

      sidebar.prepend(sidebarButton);
    }
  }

  if (getInitialState()) {
    document.documentElement.classList.add("qaic-sidebar-collapsed-initial");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.documentElement.classList.contains("qaic-sidebar-collapsed-initial")) {
      document.documentElement.classList.remove("qaic-sidebar-collapsed-initial");
      document.body.classList.add("qaic-sidebar-collapsed");
    }
    addSidebarToggle();
    updateButton();
  });
})();
