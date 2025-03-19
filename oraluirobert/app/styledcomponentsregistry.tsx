"use client";

import React, { useState, useEffect } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyles, setStyledComponentsStyles] = useState<any>(null);

  useServerInsertedHTML(() => {
    return styledComponentsStyles;
  });

  useEffect(() => {
    setStyledComponentsStyles(
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "theme"}>
        {children}
      </StyleSheetManager>
    );
  }, []);

  return styledComponentsStyles;
}
