/** Drawn product screens in components/illustrations; one per project plus feature close-ups. */
export type IllustrationKind =
  | "stampd"
  | "mawasem-store"
  | "mawasem-dashboard"
  | "chillwork"
  | "chillwork-triage"
  | "chillwork-schedule"
  | "chillwork-parts"
  | "chillwork-invoice"
  | "lumina"
  | "foodie"
  | "weather"
  | "student-guide"
  | "wild-oasis";

export type CaseFeature = {
  illustration: IllustrationKind;
  title: string;
  text: string;
};

/** A capture of the live demo in public/projects/<slug>/, 1440×900. */
export type Screenshot = {
  src: string;
  /** Caption, also the image's alt text. */
  caption: string;
};

export type HardPart = {
  title: string;
  text: string;
};

export type ProjectEntry = {
  /** URL segment of the case-study page, /work/[slug]. */
  slug: string;
  /** Index row title. */
  title: string;
  /** Case-study page heading. */
  name: string;
  category: string;
  description: string;
  descriptionShort: string;
  /** The homepage preview's hard-part sentence. */
  hardPart: string;
  tech: string[];
  illustration: IllustrationKind;
  /** Describes the illustration for assistive technology. */
  illustrationLabel: string;
  /** Absent (not empty) when a project has no public link — see mawasem-dashboard. */
  link?: string;
  /** Second live app of the same project, shown beside `link`. */
  dashboardLink?: string;
  /** Shown instead of the link when `link` is absent. */
  noLinkReason?: string;
  role?: string;
  platforms?: string[];
  problem?: string[];
  built?: string[];
  features?: CaseFeature[];
  /** Captures of the live demo, shown in their own case-page section. */
  screenshots?: Screenshot[];
  hardParts: HardPart[];
  status?: string[];
};
