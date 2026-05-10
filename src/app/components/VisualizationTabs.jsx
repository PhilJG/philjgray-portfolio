"use client";
import React, { useState } from "react";

function Tab() {
  return null;
}
Tab.displayName = "Tab";

const maskBase = (src) => ({
  WebkitMaskImage: `url('${src}')`,
  maskImage: `url('${src}')`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
});

const activeIconStyle = (src) => ({
  ...maskBase(src),
  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))",
});

const inactiveIconStyle = (src) => ({
  ...maskBase(src),
  background: "hsl(var(--foreground))",
});

export default function VisualizationTabs({ children }) {
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Tab
  );

  const [activeId, setActiveId] = useState(tabs[0]?.props?.id ?? "");
  const activeTab = tabs.find((t) => t.props.id === activeId);

  return (
    <div>
      {/* Folder tab strip */}
      <div className="flex flex-wrap gap-0.5">
        {tabs.map((tab) => {
          const isActive = tab.props.id === activeId;
          return (
            <button
              key={tab.props.id}
              onClick={() => setActiveId(tab.props.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-t-lg border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "border-border bg-background text-primary font-medium relative z-10 [border-bottom-color:hsl(var(--background))]"
                  : "border-border bg-muted/40 text-foreground hover:bg-muted/60 hover:border-primary hover:shadow-[0_0_22px_hsl(var(--primary)/0.45)]"
              }`}
            >
              {tab.props.iconSrc && (
                <div
                  className="w-10 h-10 flex-shrink-0"
                  style={isActive ? activeIconStyle(tab.props.iconSrc) : inactiveIconStyle(tab.props.iconSrc)}
                />
              )}
              <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                {tab.props.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content area — -mt-px overlaps the strip's bottom border so active tab merges */}
      <div className="border border-border rounded-b-lg rounded-tr-lg bg-background p-6 -mt-px">
        {activeTab &&
          (activeTab.props.videoSrc ? (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 min-w-0">{activeTab.props.children}</div>
              <div className="md:w-1/2 flex-shrink-0">
                <video
                  src={activeTab.props.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                  poster={activeTab.props.videoPoster}
                />
              </div>
            </div>
          ) : (
            activeTab.props.children
          ))}
      </div>
    </div>
  );
}

VisualizationTabs.Tab = Tab;
