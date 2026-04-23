import { STORIES } from '@/lib/stories'
import { client } from '@/sanity/lib/client'
import { allStoriesQuery } from '@/sanity/lib/queries'
import { HomePageClient, type HomeStory } from './HomePageClient'

export const revalidate = 3600

async function getStoriesForHome(): Promise<HomeStory[]> {
  if (!client) return STORIES as unknown as HomeStory[]
  try {
    const data = await client.fetch<HomeStory[]>(allStoriesQuery, {}, { next: { tags: ['stories'] } })
    return data ?? []
  } catch {
    return STORIES as unknown as HomeStory[]
  }
}

export default async function Home() {
  const stories = await getStoriesForHome()
  return <HomePageClient stories={stories} />
}
