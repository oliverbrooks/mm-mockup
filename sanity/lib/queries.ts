import { groq } from 'next-sanity'

// Person projection — reused across queries
const personProjection = groq`{
  _id,
  name,
  role,
  bio,
  tone,
  era,
  origin,
  "portrait": portrait { asset, hotspot, crop },
  links,
}`

export const allStoriesQuery = groq`
  *[_type == "story"] | order(featured desc, publishedAt desc) {
    _id,
    slug,
    title,
    "contributor": contributor->.name,
    "role": contributor->.role,
    "tone": contributor->.tone,
    format,
    theme,
    era,
    readingTime,
    lede,
    pullQuote,
    featured,
    publishedAt,
    objectLabel,
    "contributorImage": contributor->.portrait { asset, hotspot, crop },
    objectImage,
  }
`

export const storyBySlugQuery = groq`
  *[_type == "story" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    "contributor": contributor->.name,
    "role": contributor->.role,
    "bio": contributor->.bio,
    "tone": contributor->.tone,
    "contributorImage": contributor->.portrait { asset, hotspot, crop },
    "contributorPerson": contributor->${personProjection},
    format,
    theme,
    era,
    readingTime,
    lede,
    pullQuote,
    body,
    objectLabel,
    objectCaption,
    objectImage,
    publishedAt,
  }
`

export const allStorySlugQuery = groq`
  *[_type == "story"] { "slug": slug.current }
`

export const relatedStoriesQuery = groq`
  *[_type == "story" && slug.current != $slug] | order(publishedAt desc)[0..2] {
    slug,
    title,
    "contributor": contributor->.name,
    "role": contributor->.role,
    format,
    era,
    readingTime,
    tone,
    lede
  }
`

export const currentExhibitionQuery = groq`
  *[_type == "exhibition" && status == "Current"] | order(_updatedAt desc) [0] {
    "slug": slug.current,
    title,
    lede,
    status,
    isFree,
    ticketUrl,
    openingDate,
    closingDate,
    location,
    accentColour,
    body,
    "images": images[] {
      _key,
      caption,
      hotspot,
      crop,
      asset,
    },
    accessInfo,
    "contributors": contributors[]-> {
      name,
      tone,
      "image": portrait { asset, hotspot, crop },
    },
    "featuredEvent": featuredEvent-> {
      title,
      date,
      price,
      isFree,
      bookingUrl,
    },
  }
`
