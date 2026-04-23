import { STORIES } from '@/lib/stories'
import { client } from '@/sanity/lib/client'
import { allStoriesQuery } from '@/sanity/lib/queries'
import { StoriesClient } from './StoriesClient'

export const revalidate = 3600

async function getStories() {
  if (!client) return STORIES
  try {
    return await client.fetch(allStoriesQuery, {}, { next: { tags: ['stories'] } })
  } catch {
    return STORIES
  }
}

export default async function StoriesPage() {
  const stories = await getStories()
  return <StoriesClient stories={stories} />
}
