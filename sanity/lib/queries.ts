import { groq } from 'next-sanity'

export const allStoriesQuery = groq`
  *[_type == "story"] | order(featured desc, publishedAt desc) {
    slug,
    title,
    contributor,
    role,
    format,
    theme,
    era,
    readingTime,
    tone,
    lede,
    pullQuote,
    featured,
    publishedAt,
    "objectLabel": objectLabel,
    contributorImage,
    objectImage,
  }
`

export const storyBySlugQuery = groq`
  *[_type == "story" && slug.current == $slug][0] {
    slug,
    title,
    contributor,
    role,
    format,
    theme,
    era,
    readingTime,
    tone,
    lede,
    pullQuote,
    body,
    objectLabel,
    objectCaption,
    objectImage,
    contributorImage,
    bio,
    publishedAt,
  }
`

export const allStorySlugQuery = groq`
  *[_type == "story"] { "slug": slug.current }
`
