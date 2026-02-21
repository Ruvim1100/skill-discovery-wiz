import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LOCATION_SUGGESTIONS = [
  "London, UK",
  "Manchester, UK",
  "Birmingham, UK",
  "Edinburgh, UK",
  "Dublin, Ireland",
  "New York, US",
  "San Francisco, US",
  "Los Angeles, US",
  "Chicago, US",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Berlin, Germany",
  "Amsterdam, Netherlands",
  "Paris, France",
  "Stockholm, Sweden",
  "Zurich, Switzerland",
  "Singapore",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Dubai, UAE",
  "Tokyo, Japan",
  "Remote / Global",
  "Europe (general)",
  "North America (general)",
  "Asia-Pacific (general)",
  "Global / open to relocation",
] as const;

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSkip: () => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  onSkip,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounce filtering
  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedQuery(value), 300);
    return () => clearTimeout(timerRef.current);
  }, [value]);

  const filtered = debouncedQuery.trim()
    ? LOCATION_SUGGESTIONS.filter((loc) =>
        loc.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  const showDropdown = isOpen && filtered.length > 0;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectItem = useCallback(
    (loc: string) => {
      onChange(loc);
      setIsOpen(false);
      setHighlightIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectItem(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <section aria-labelledby="location-heading" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 id="location-heading" className="text-lg font-semibold text-foreground">
            Where would you like to work?
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center h-6 w-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Why do we ask about location?"
              >
                <HelpCircle size={16} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[260px] text-xs">
              Your location helps us tailor job recommendations and CV format suggestions to your region.
            </TooltipContent>
          </Tooltip>
        </div>

        <div ref={containerRef} className="relative max-w-md">
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setIsOpen(true);
              setHighlightIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., London, UK or Global"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            aria-controls="location-listbox"
            role="combobox"
            className="min-h-[44px]"
          />

          {showDropdown && (
            <ul
              id="location-listbox"
              role="listbox"
              className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-md border shadow-md"
              style={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
              }}
            >
              {filtered.map((loc, i) => (
                <li
                  key={loc}
                  role="option"
                  aria-selected={i === highlightIndex}
                  className="px-3 py-2 text-sm cursor-pointer min-h-[44px] flex items-center"
                  style={{
                    backgroundColor: i === highlightIndex ? "var(--accent)" : undefined,
                    color: "var(--foreground)",
                  }}
                  onMouseEnter={() => setHighlightIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectItem(loc);
                  }}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="self-start text-sm font-medium underline underline-offset-2 min-h-[44px] px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          style={{ color: "var(--primary)" }}
        >
          Skip — I'm open to anywhere
        </button>
      </section>
    </TooltipProvider>
  );
};
