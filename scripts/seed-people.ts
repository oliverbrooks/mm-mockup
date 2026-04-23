/**
 * Seed person documents and wire them up to stories and exhibitions.
 * Run with: npx tsx scripts/seed-people.ts
 * Requires SANITY_API_TOKEN with write access in .env.local
 */
import { createClient } from '@sanity/client'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function personId(name: string) {
  return 'person-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function storyId(slug: string) {
  return 'story-' + slug
}

function ref(id: string) {
  return { _type: 'reference', _ref: id }
}

function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `block-${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
  }))
}

// ─── People ──────────────────────────────────────────────────────────────────

const PEOPLE = [
  // Story contributors
  {
    name: 'Karen Arthur',
    role: 'Fashion designer & contributor',
    bio: 'Karen Arthur is a British-Barbadian fashion designer and textile artist based in South London. Her work explores Black womanhood, inheritance, and the politics of visibility. She has exhibited at Tate Modern and the V&A.',
    tone: 'red',
    era: 'Today',
  },
  {
    name: 'Ayo Adeyemi',
    role: 'Writer & researcher',
    bio: 'Ayo Adeyemi is a journalist and historian specialising in the African diaspora and post-war British history. His long-form features have appeared in the Guardian, the Observer, and Delayed Gratification.',
    tone: 'cool',
    era: 'Windrush era',
  },
  {
    name: 'The Kaur family',
    role: 'Community contributors',
    bio: 'The Kaur family — Harpreet, Parminder, and Simran — are long-standing members of the Migration Museum\'s Migration Network. Harpreet has contributed her testimony to three exhibitions since 2018.',
    tone: 'violet',
    era: '1970–2000',
  },
  {
    name: 'Priya Singh',
    role: 'Food writer & contributor',
    bio: "Priya Singh is a food writer and cultural historian. Her book 'The Other Menu' (2023) traces the history of South Asian restaurants in Britain. She contributes regularly to the BBC Food programme and the Financial Times Weekend.",
    tone: 'yellow',
    era: '1970–2000',
  },
  {
    name: 'Hackney students, 2024',
    role: 'Youth contributors',
    bio: "This project was co-produced with Year 10 and Year 11 students at Stoke Newington School, Hackney, in partnership with the Migration Museum's learning team. The students chose their own pseudonyms.",
    tone: 'green',
    era: 'Today',
  },
  {
    name: 'Migration Museum',
    role: 'Exhibition spotlight',
    bio: "Who Runs the World? was designed and produced by the Migration Museum's programmes team, with community curators in each city. The project was supported by the Paul Hamlyn Foundation.",
    tone: 'warm',
    era: 'Today',
  },
  // Exhibition-only contributors
  { name: 'Alok Mehta',       role: 'Exhibition contributor', bio: '', tone: 'violet', era: 'Today' },
  { name: 'Fatima Osman',     role: 'Exhibition contributor', bio: '', tone: 'green',  era: 'Today' },
  { name: 'Viktor Lazarenko', role: 'Exhibition contributor', bio: '', tone: 'cool',   era: 'Today' },
  { name: 'Mei Tan',          role: 'Exhibition contributor', bio: '', tone: 'yellow', era: 'Today' },
  { name: 'Joseph Adebayo',   role: 'Exhibition contributor', bio: '', tone: 'warm',   era: 'Today' },
  { name: 'Amira Haddad',     role: 'Exhibition contributor', bio: '', tone: 'violet', era: 'Today' },
  { name: 'Rosa López',       role: 'Exhibition contributor', bio: '', tone: 'red',    era: 'Today' },
  { name: 'Ishaan Patel',     role: 'Exhibition contributor', bio: '', tone: 'cool',   era: 'Today' },
]

// ─── Stories ─────────────────────────────────────────────────────────────────

const STORIES = [
  {
    slug: 'windrush-nhs',
    contributor: 'Ayo Adeyemi',
    title: 'The day the Empire Windrush docked, and the NHS began.',
    format: 'Feature',
    theme: 'Windrush era',
    era: 'Windrush era',
    readingTime: '14 min',
    pullQuote: 'Two arrivals, five days apart, in June 1948. Both shaped Britain more than almost anything that followed.',
    lede: 'Two seismic arrivals in the summer of 1948 — told with archive, oral histories, and music.',
    body: [
      "On 22 June 1948, the HMT Empire Windrush docked at Tilbury, Essex. On board: 492 men and women from Jamaica, Trinidad, and Barbados, many of them RAF veterans who had served Britain during the war. They had come, they believed, as citizens. Britain was in ruins and needed rebuilding. They were there to help.",
      "Five days later, on 5 July 1948, the National Health Service came into existence. Aneurin Bevan inaugurated it at Park Hospital in Manchester. He called it 'the most civilised step any country has ever taken.' What he didn't say — what nobody said, at least not officially — was that the two events were inextricably linked.",
      "The NHS was built on migration. Not just metaphorically, but structurally. The wards that opened in July 1948 were staffed in part by the nurses and auxiliaries who arrived on that ship and the dozens that followed. Ena Douce. Sylvia Fairweather. Connie Mark. Their names don't appear in the official histories, but they appear in hospital records, in letters home, and in the testimonies we've collected over the past three years.",
      "This is the story of two arrivals. And of why we keep telling them as if they have nothing to do with each other.",
    ],
    objectLabel: 'Identity document, 1948',
    objectCaption: 'British passport issued to Ena Douce, Jamaica, 1947. On loan from the Douce family.',
  },
  {
    slug: 'routes-ugandan-asians',
    contributor: 'The Kaur family',
    title: 'Routes: the Ugandan Asians.',
    format: 'Oral history',
    theme: 'Arrival',
    era: '1970–2000',
    readingTime: '12 min',
    pullQuote: 'We left with one suitcase. We built everything from that.',
    lede: "A family archive traces the journey from Kampala to Leicester — and what was carried, and lost, along the way.",
    body: [
      "In August 1972, Idi Amin gave Uganda's Asian community ninety days to leave. Around 27,000 people came to Britain, most with almost nothing. The British government called it a crisis. The Ugandan Asians called it survival.",
      "Harpreet Kaur was eleven years old when her family landed at Stansted Airport. She remembers the cold. She remembers the volunteers with tea. She remembers that nobody explained what was happening to her — the adults were too frightened and too busy to explain anything.",
      "Sixty years on, Harpreet's daughter Parminder is an NHS consultant. Her granddaughter Simran is reading law at UCL. The family carries its history differently across three generations — as trauma, as foundation myth, as something to be proud of.",
      "'My grandmother never talked about what she left behind,' Simran tells us. 'But she talked endlessly about what she built. I think that was a conscious choice. I think she decided that was how she was going to survive it.'",
    ],
    objectLabel: 'Family suitcase, c.1972',
    objectCaption: "The suitcase Harpreet Kaur's family carried from Kampala. Donated to the museum by the Kaur family, 2023.",
  },
  {
    slug: 'how-curry-became-british',
    contributor: 'Priya Singh',
    title: 'How curry became British.',
    format: 'Food story',
    theme: 'Food',
    era: '1970–2000',
    readingTime: '6 min',
    pullQuote: "Chicken tikka masala wasn't invented in India. It was invented by migrants who understood their customers better than their customers understood themselves.",
    lede: 'The dish that went from immigrant survival to national obsession — and what that journey really means.',
    body: [
      "There is a story, possibly apocryphal, about the invention of chicken tikka masala. A Glasgow restaurant in the early 1970s. A customer complained his tikka was dry. The chef, improvising, added a can of Campbell's tomato soup and some spices. The dish stayed on the menu. Then it spread. Then it became, according to a 2001 speech by Foreign Secretary Robin Cook, 'a true British national dish.'",
      "The story captures something real, even if the details are disputed. The great British curries were not Indian dishes transported intact to British plates. They were adaptations — created in kitchens by people who were themselves in the process of adapting, who were reading their customers and their context and making something new.",
      "Priya Singh's grandmother opened one of Bradford's first Indian restaurants in 1969. She kept two menus. One for the regulars — richer, spicier, more complex. One for everyone else. 'She wasn't being deceptive,' Priya says. 'She was being practical. She was trying to survive. And then she started to thrive.'",
      "The curry house was not a place where Indian culture was preserved in aspic. It was a laboratory. And the experiment it was running was Britain.",
    ],
    objectLabel: 'Recipe notebook, c.1971',
    objectCaption: 'Handwritten recipe book belonging to Surinder Kaur, Bradford, c.1971–1984. On loan from Priya Singh.',
  },
  {
    slug: 'young-people-rewriting-the-map',
    contributor: 'Hackney students, 2024',
    title: 'Young people, rewriting the map.',
    format: 'Youth voices',
    theme: 'Youth',
    era: 'Today',
    readingTime: '5 min',
    pullQuote: "My mum came here with nothing. I grew up here with everything. But somehow I'm still asked where I'm really from.",
    lede: "A community project with secondary school students in Hackney — their families' stories, in their own words.",
    body: [
      "We asked twelve students from Stoke Newington School to interview a family member about migration. The results were extraordinary. One student discovered that her grandmother had crossed three borders in three days in 1994. Another found a grandfather who had never spoken about his journey from Lagos in fifty years of living in London.",
      "The project started as a term's work. It became something else. The students began comparing notes — finding patterns across stories that seemed totally different. 'We realised,' said one participant, 'that all our grandparents were scared when they arrived. Even the ones who seemed completely confident. They were all scared.'",
      "We're sharing seven of those stories here, edited lightly and published with full consent. The students chose their own pseudonyms. The words are entirely theirs.",
      "'My mum came here with nothing,' writes one student. 'I grew up here with everything. But somehow I'm still asked where I'm really from. I used to find that question upsetting. Now I think the question says more about the person asking than it does about me.'",
    ],
    objectLabel: 'Migration maps, students 2024',
    objectCaption: "Hand-drawn maps made by the Hackney students showing their families' migration routes. Ink on paper, 2024.",
  },
  {
    slug: 'who-runs-the-world',
    contributor: 'Migration Museum',
    title: 'Who Runs the World? Inside our pop-up festival.',
    format: 'Exhibition',
    theme: 'Women',
    era: 'Today',
    readingTime: '4 min',
    pullQuote: "Women's migration stories have been the footnotes for too long. This festival put them on the cover.",
    lede: "Books, food, fashion and family memory — a weekend pop-up that put women's migration stories centre stage.",
    body: [
      "On a Saturday morning in May, the upstairs of a community centre in Leeds smelled of samosas and old paper. Fifty women — ranging in age from nineteen to eighty-three — were spread across fold-out chairs, reading. The books in their hands had been chosen by the women themselves: novels, memoirs, poetry collections, recipe books.",
      "Who Runs the World? was our first explicitly women-centred pop-up programme. It ran across three weekends in Leeds, Bristol, and Newham. Each event had a different character — shaped by the communities and the venues — but each one asked the same question: what do women's migration stories look like when women get to tell them?",
      "The answer, it turned out, was: more complicated, funnier, angrier, and more food-focused than the usual version.",
      "We're planning a second run in 2026. If you'd like to get involved as a contributor, curator, or community partner, get in touch.",
    ],
    objectLabel: 'Pop-up display, Leeds, May 2024',
    objectCaption: 'Community book display at the Who Runs the World? pop-up, Leeds, May 2024. Photo by Lola Oyewole.',
  },
]

// Exhibition contributor order (matches original page)
const EXHIBITION_CONTRIBUTOR_NAMES = [
  'Karen Arthur', 'Alok Mehta', 'Fatima Osman', 'Viktor Lazarenko', 'Mei Tan',
  'Joseph Adebayo', 'Amira Haddad', 'Rosa López', 'Ishaan Patel', 'Priya Singh',
]

// ─── Seed ────────────────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌  SANITY_API_TOKEN is not set in .env.local')
    process.exit(1)
  }

  // 1. Create person documents
  console.log('\n── People ──────────────────────────────')
  for (const person of PEOPLE) {
    const id = personId(person.name)
    await client.createOrReplace({
      _type: 'person',
      _id: id,
      name: person.name,
      slug: { _type: 'slug', current: id.replace('person-', '') },
      role: person.role,
      bio: person.bio,
      tone: person.tone,
      era: person.era,
    })
    console.log(`  ✓ ${person.name} (${id})`)
  }

  // 2. Create story documents with person references
  console.log('\n── Stories ─────────────────────────────')
  for (const story of STORIES) {
    const id = storyId(story.slug)
    const contribId = personId(story.contributor)
    await client.createOrReplace({
      _type: 'story',
      _id: id,
      slug: { _type: 'slug', current: story.slug },
      title: story.title,
      contributor: ref(contribId),
      format: story.format,
      theme: story.theme,
      era: story.era,
      readingTime: story.readingTime,
      lede: story.lede,
      pullQuote: story.pullQuote,
      body: toBlocks(story.body),
      objectLabel: story.objectLabel,
      objectCaption: story.objectCaption,
      publishedAt: new Date().toISOString(),
    })
    console.log(`  ✓ ${story.title.substring(0, 50)}`)
  }

  // 3. Patch the existing exhibition to use person references
  console.log('\n── Exhibition ──────────────────────────')
  const contribRefs = EXHIBITION_CONTRIBUTOR_NAMES.map((name, i) => ({
    _type: 'reference',
    _ref: personId(name),
    _key: `contrib-${i}`,
  }))

  await client
    .patch('exhibition-all-our-stories')
    .set({ contributors: contribRefs })
    .commit()
  console.log(`  ✓ Linked ${contribRefs.length} contributors to exhibition`)

  console.log('\n✅  Seed complete\n')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
