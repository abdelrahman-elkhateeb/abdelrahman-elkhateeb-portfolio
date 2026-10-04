"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"
import ArrowGlyph from "@/components/shared/ArrowGlyph"

type IndexRow = {
  slug: string
  title: string
  descriptionShort: string
  category: string
}

/** Rows link to the case-study pages. From 1024px the hovered or focused row
    picks which server-rendered preview is shown beside the list; the last one
    stays until another row takes over, so the panel is never empty. */
export default function ProjectIndex({ rows, previews }: { rows: IndexRow[]; previews: ReactNode[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="mt-11 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start lg:gap-14">
      <ol className="m-0 flex list-none flex-col border-t border-foreground/10 p-0">
        {rows.map((row, index) => {
          const number = String(index + 1).padStart(2, "0")
          return (
            <li key={row.slug} className="border-b border-foreground/10">
              <Link
                href={`/work/${row.slug}`}
                data-active={index === active}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="nx-index-row grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 rounded-lg px-1 py-5 font-sans md:grid-cols-[44px_minmax(0,1fr)_auto] md:gap-x-5 md:px-4 md:py-[22px]">
                <span className="nx-index-num hidden font-mono text-[13px] tracking-[0.1em] text-primary md:block">{number}</span>
                <span className="flex min-w-0 flex-col gap-2 md:gap-1.5">
                  <span className="flex gap-3 font-mono text-[11px] tracking-[0.18em] uppercase md:hidden">
                    <span className="text-primary">{number}</span>
                    <span className="text-ink-tertiary">{row.category}</span>
                  </span>
                  <span className="nx-index-title text-[21px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[24px]">{row.title}</span>
                  <span className="text-[14px] leading-[1.55] text-muted-foreground">{row.descriptionShort}</span>
                </span>
                <span className="flex items-center gap-[18px]">
                  <span className="hidden font-mono text-[11px] tracking-[0.18em] whitespace-nowrap text-ink-tertiary uppercase md:inline">{row.category}</span>
                  <ArrowGlyph className="nx-card-arrow size-4 shrink-0 text-primary md:size-[18px]" />
                </span>
              </Link>
            </li>
          )
        })}
      </ol>

      <div className="hidden lg:sticky lg:top-[120px] lg:grid">
        {previews.map((preview, index) => (
          <div
            key={rows[index].slug}
            data-active={index === active}
            aria-hidden={index !== active || undefined}
            inert={index !== active}
            className="nx-preview col-start-1 row-start-1">
            {preview}
          </div>
        ))}
      </div>
    </div>
  )
}
