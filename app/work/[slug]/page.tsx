import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CaseStudy from "@/features/projects/CaseStudy"
import { getProject, projectsData } from "@/features/projects/data"
import { siteConfig } from "@/lib/site-config"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projectsData.map(project => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: `${project.name} · ${siteConfig.name}`,
    description: project.description,
  }
}

export default async function WorkPage({ params }: Params) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return <CaseStudy project={project} />
}
