const $ = document.querySelector.bind(document);

const content = $(".content");
const container = $(".scroll-container");

function attachScrollbar(el) {
  const updateScrollbar = (el) => {
    const content = el.querySelector(".content");
    const scrollbar = el.querySelector(".scrollbar");
    const handle = el.querySelector(".scrollbar-handle");
    const scrollPos = content.scrollTop / content.scrollHeight;
    const offset = scrollPos * scrollbar.clientHeight;
    scrollbar.style.height = el.clientHeight + "px";
    const handleLength = content.clientHeight / content.scrollHeight;
    handle.style.height = handleLength * 100 + "%";
    handle.style.top = offset + "px";
  };

  const updateScrollPos = ({ target, clientY, type }) => {
    const handle = el.querySelector(".scrollbar-handle");
    const { top } = scrollbar.getBoundingClientRect();
    const offsetY = clientY - top;
    const scrollPos = offsetY / scrollbar.clientHeight;
    content.scrollTo(0, scrollPos * content.scrollHeight - handle.clientHeight);
  };

  const scrollHandler = () => {
    updateScrollbar(el);
  };

  const content = el.querySelector(".content");
  const scrollbar = document.createElement("div");
  const handle = document.createElement("div");
  let mousedown = false;

  scrollbar.classList.add("scrollbar");
  handle.classList.add("scrollbar-handle");
  scrollbar.appendChild(handle);

  scrollbar.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (e.buttons === 1) mousedown = true;
  });

  document.body.addEventListener("mouseup", () => {
    mousedown = false;
  });

  scrollbar.addEventListener(
    "mousedown",
    (e) => {
      if (e.buttons === 1) updateScrollPos(e);
    },
    { passive: true }
  );

  document.body.addEventListener(
    "mousemove",
    (e) => {
      if (!(mousedown && e.buttons === 1)) return;
      updateScrollPos(e);
    },
    { passive: true }
  );

  content.addEventListener("scroll", scrollHandler, { paѕsive: true });
  el.appendChild(scrollbar);
  scrollHandler();
}

attachScrollbar(container);
