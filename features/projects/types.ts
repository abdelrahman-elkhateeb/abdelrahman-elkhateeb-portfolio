import type { StaticImageData } from "next/image";

export type ProjectEntry = {
  title: string;
  description: string;
  descriptionShort: string;
  hardPart: string;
  hardPartShort: string;
  tech: string[];
  image: StaticImageData;
  /** Absent (not empty) when a project has no public link — see project 2. */
  link?: string;
  /** Shown instead of the arrow/link when `link` is absent. */
  noLinkReason?: string;
};

