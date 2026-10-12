import "./style.css";

type Preset = {
  id: string;
  description: string;
  enter: string;
  panel: string;
};

const baseStageClass =
  "rounded-xl bg-violet-600/20 px-8 py-6 text-center text-sm font-medium text-violet-100 ring-1 ring-violet-500/40";

const presets: Preset[] = [
  {
    id: "fade-slide",
    description: "fade-in slide-in-from-bottom-4 duration-500",
    enter: "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
    panel: "Enter animation",
  },
  {
    id: "zoom",
    description: "fade-in zoom-in-95 duration-300",
    enter: "animate-in fade-in zoom-in-95 duration-300 fill-mode-both",
    panel: "Zoom",
  },
  {
    id: "spin",
    description: "fade-in spin-in-12 duration-500",
    enter: "animate-in fade-in spin-in-12 duration-500 fill-mode-both",
    panel: "Spin",
  },
  {
    id: "blur",
    description: "fade-in blur-in duration-500",
    enter: "animate-in fade-in blur-in duration-500 fill-mode-both",
    panel: "Blur",
  },
  {
    id: "slide-top",
    description: "slide-in-from-top-8 duration-500",
    enter: "animate-in fade-in slide-in-from-top-8 duration-500 fill-mode-both",
    panel: "From top",
  },
];

const presetSelect = document.querySelector<HTMLSelectElement>("#preset-select");
const presetDescription = document.querySelector<HTMLParagraphElement>("#preset-description");
const enterStage = document.querySelector<HTMLDivElement>("#enter-stage");
const replayEnter = document.querySelector<HTMLButtonElement>("#replay-enter");

if (!presetSelect || !presetDescription || !enterStage || !replayEnter) {
  console.warn("Demo controls not found — page markup should still be visible.");
} else {
  function getPreset(): Preset {
    return presets.find((p) => p.id === presetSelect.value) ?? presets[0];
  }

  function playEnterAnimation() {
    const preset = getPreset();
    presetDescription.textContent = preset.description;
    enterStage.textContent = preset.panel;
    enterStage.className = baseStageClass;
    void enterStage.offsetWidth;
    enterStage.className = `${baseStageClass} ${preset.enter}`;
  }

  presetSelect.addEventListener("change", playEnterAnimation);
  replayEnter.addEventListener("click", playEnterAnimation);
}

const statePanel = document.querySelector<HTMLDivElement>("#state-panel");
const stateLabel = document.querySelector<HTMLSpanElement>("#state-label");
const toggleState = document.querySelector<HTMLButtonElement>("#toggle-state");

toggleState?.addEventListener("click", () => {
  if (!statePanel || !stateLabel) return;
  const open = statePanel.dataset.state !== "open";
  statePanel.dataset.state = open ? "open" : "closed";
  stateLabel.textContent = open ? "open" : "closed";
});

const accordionTrigger = document.querySelector<HTMLButtonElement>("#accordion-trigger");
const accordionContent = document.querySelector<HTMLDivElement>("#accordion-content");
const accordionChevron = document.querySelector<HTMLSpanElement>("#accordion-chevron");

let accordionOpen = true;

function syncAccordionHeight() {
  const inner = accordionContent?.firstElementChild;
  if (!(inner instanceof HTMLElement) || !accordionContent) return;
  accordionContent.style.setProperty("--radix-accordion-content-height", `${inner.offsetHeight}px`);
}

syncAccordionHeight();
window.addEventListener("resize", syncAccordionHeight);

accordionTrigger?.addEventListener("click", () => {
  if (!accordionContent || !accordionChevron) return;
  syncAccordionHeight();
  accordionOpen = !accordionOpen;
  accordionTrigger.setAttribute("aria-expanded", String(accordionOpen));
  accordionChevron.textContent = accordionOpen ? "▾" : "▸";
  accordionContent.dataset.state = accordionOpen ? "open" : "closed";
  accordionContent.classList.remove("animate-accordion-down", "animate-accordion-up");
  void accordionContent.offsetWidth;
  accordionContent.classList.add(accordionOpen ? "animate-accordion-down" : "animate-accordion-up");
});
