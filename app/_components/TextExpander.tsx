"use client";
import { useState } from "react";

function TextExpander({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? description
    : description.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
