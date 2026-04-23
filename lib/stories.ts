import type { SanityImageSource } from '@sanity/image-url'

export type StoryFormat = 'Oral history' | 'Feature' | 'Food story' | 'Youth voices' | 'Exhibition'

export interface Story {
  slug: { current: string }
  title: string
  contributor: string
  role: string
  format: StoryFormat
  theme: string
  era: string
  readingTime: string
  tone: string
  pullQuote: string
  lede: string
  body: string[]
  object: { label: string; caption: string }
  contributorImage?: SanityImageSource
  objectImage?: SanityImageSource
  objectLabel?: string
  objectCaption?: string
  bio: string
}

export const STORIES: Story[] = [
  {
    slug: { current: 'windrush-nhs' },
    title: 'The day the Empire Windrush docked, and the NHS began.',
    contributor: 'Ayo Adeyemi',
    role: 'Writer & researcher',
    format: 'Feature',
    theme: 'Windrush era',
    era: 'Windrush era',
    readingTime: '14 min',
    tone: 'cool',
    pullQuote: 'Two arrivals, five days apart, in June 1948. Both shaped Britain more than almost anything that followed.',
    lede: 'Two seismic arrivals in the summer of 1948 — told with archive, oral histories, and music.',
    body: [
      "On 22 June 1948, the HMT Empire Windrush docked at Tilbury, Essex. On board: 492 men and women from Jamaica, Trinidad, and Barbados, many of them RAF veterans who had served Britain during the war. They had come, they believed, as citizens. Britain was in ruins and needed rebuilding. They were there to help.",
      "Five days later, on 5 July 1948, the National Health Service came into existence. Aneurin Bevan inaugurated it at Park Hospital in Manchester. He called it 'the most civilised step any country has ever taken.' What he didn't say — what nobody said, at least not officially — was that the two events were inextricably linked.",
      "The NHS was built on migration. Not just metaphorically, but structurally. The wards that opened in July 1948 were staffed in part by the nurses and auxiliaries who arrived on that ship and the dozens that followed. Ena Douce. Sylvia Fairweather. Connie Mark. Their names don't appear in the official histories, but they appear in hospital records, in letters home, and in the testimonies we've collected over the past three years.",
      "This is the story of two arrivals. And of why we keep telling them as if they have nothing to do with each other.",
    ],
    object: {
      label: 'Identity document, 1948',
      caption: 'British passport issued to Ena Douce, Jamaica, 1947. On loan from the Douce family.',
    },
    bio: 'Ayo Adeyemi is a journalist and historian specialising in the African diaspora and post-war British history. His long-form features have appeared in the Guardian, the Observer, and Delayed Gratification.',
  },
  {
    slug: { current: 'routes-ugandan-asians' },
    title: 'Routes: the Ugandan Asians.',
    contributor: 'The Kaur family',
    role: 'Community contributors',
    format: 'Oral history',
    theme: 'Arrival',
    era: '1970–2000',
    readingTime: '12 min',
    tone: 'violet',
    pullQuote: 'We left with one suitcase. We built everything from that.',
    lede: "A family archive traces the journey from Kampala to Leicester — and what was carried, and lost, along the way.",
    body: [
      "In August 1972, Idi Amin gave Uganda's Asian community ninety days to leave. Around 27,000 people came to Britain, most with almost nothing. The British government called it a crisis. The Ugandan Asians called it survival.",
      "Harpreet Kaur was eleven years old when her family landed at Stansted Airport. She remembers the cold. She remembers the volunteers with tea. She remembers that nobody explained what was happening to her — the adults were too frightened and too busy to explain anything.",
      "Sixty years on, Harpreet's daughter Parminder is an NHS consultant. Her granddaughter Simran is reading law at UCL. The family carries its history differently across three generations — as trauma, as foundation myth, as something to be proud of.",
      "'My grandmother never talked about what she left behind,' Simran tells us. 'But she talked endlessly about what she built. I think that was a conscious choice. I think she decided that was how she was going to survive it.'",
    ],
    object: {
      label: 'Family suitcase, c.1972',
      caption: "The suitcase Harpreet Kaur's family carried from Kampala. Donated to the museum by the Kaur family, 2023.",
    },
    bio: "The Kaur family — Harpreet, Parminder, and Simran — are long-standing members of the Migration Museum's Migration Network. Harpreet has contributed her testimony to three exhibitions since 2018.",
  },
  { 
    slug: { current: 'how-curry-became-british' },
    title: 'How curry became British.',
    contributor: 'Priya Singh',
    role: 'Food writer & contributor',
    format: 'Food story',
    theme: 'Food',
    era: '1970–2000',
    readingTime: '6 min',
    tone: 'yellow',
    pullQuote: "Chicken tikka masala wasn't invented in India. It was invented by migrants who understood their customers better than their customers understood themselves.",
    lede: 'The dish that went from immigrant survival to national obsession — and what that journey really means.',
    body: [
      "There is a story, possibly apocryphal, about the invention of chicken tikka masala. A Glasgow restaurant in the early 1970s. A customer complained his tikka was dry. The chef, improvising, added a can of Campbell's tomato soup and some spices. The dish stayed on the menu. Then it spread. Then it became, according to a 2001 speech by Foreign Secretary Robin Cook, 'a true British national dish.'",
      "The story captures something real, even if the details are disputed. The great British curries were not Indian dishes transported intact to British plates. They were adaptations — created in kitchens by people who were themselves in the process of adapting, who were reading their customers and their context and making something new.",
      "Priya Singh's grandmother opened one of Bradford's first Indian restaurants in 1969. She kept two menus. One for the regulars — richer, spicier, more complex. One for everyone else. 'She wasn't being deceptive,' Priya says. 'She was being practical. She was trying to survive. And then she started to thrive.'",
      "The curry house was not a place where Indian culture was preserved in aspic. It was a laboratory. And the experiment it was running was Britain.",
    ],
    object: {
      label: 'Recipe notebook, c.1971',
      caption: 'Handwritten recipe book belonging to Surinder Kaur, Bradford, c.1971–1984. On loan from Priya Singh.',
    },
    bio: "Priya Singh is a food writer and cultural historian. Her book 'The Other Menu' (2023) traces the history of South Asian restaurants in Britain. She contributes regularly to the BBC Food programme and the Financial Times Weekend.",
  },
  {
    slug: { current: 'young-people-rewriting-the-map' },
    title: 'Young people, rewriting the map.',
    contributor: 'Hackney students, 2024',
    role: 'Youth contributors',
    format: 'Youth voices',
    theme: 'Youth',
    era: 'Today',
    readingTime: '5 min',
    tone: 'green',
    pullQuote: "My mum came here with nothing. I grew up here with everything. But somehow I'm still asked where I'm really from.",
    lede: "A community project with secondary school students in Hackney — their families' stories, in their own words.",
    body: [
      "We asked twelve students from Stoke Newington School to interview a family member about migration. The results were extraordinary. One student discovered that her grandmother had crossed three borders in three days in 1994. Another found a grandfather who had never spoken about his journey from Lagos in fifty years of living in London.",
      "The project started as a term's work. It became something else. The students began comparing notes — finding patterns across stories that seemed totally different. 'We realised,' said one participant, 'that all our grandparents were scared when they arrived. Even the ones who seemed completely confident. They were all scared.'",
      "We're sharing seven of those stories here, edited lightly and published with full consent. The students chose their own pseudonyms. The words are entirely theirs.",
      "'My mum came here with nothing,' writes one student. 'I grew up here with everything. But somehow I'm still asked where I'm really from. I used to find that question upsetting. Now I think the question says more about the person asking than it does about me.'",
    ],
    object: {
      label: 'Migration maps, students 2024',
      caption: "Hand-drawn maps made by the Hackney students showing their families' migration routes. Ink on paper, 2024.",
    },
    bio: "This project was co-produced with Year 10 and Year 11 students at Stoke Newington School, Hackney, in partnership with the Migration Museum's learning team. The students chose their own pseudonyms.",
  },
  {
    slug: { current: 'who-runs-the-world' } ,
    title: "Who Runs the World? Inside our pop-up festival.",
    contributor: 'Migration Museum',
    role: 'Exhibition spotlight',
    format: 'Exhibition',
    theme: 'Women',
    era: 'Today',
    readingTime: '4 min',
    tone: 'warm',
    pullQuote: "Women's migration stories have been the footnotes for too long. This festival put them on the cover.",
    lede: "Books, food, fashion and family memory — a weekend pop-up that put women's migration stories centre stage.",
    body: [
      "On a Saturday morning in May, the upstairs of a community centre in Leeds smelled of samosas and old paper. Fifty women — ranging in age from nineteen to eighty-three — were spread across fold-out chairs, reading. The books in their hands had been chosen by the women themselves: novels, memoirs, poetry collections, recipe books.",
      "Who Runs the World? was our first explicitly women-centred pop-up programme. It ran across three weekends in Leeds, Bristol, and Newham. Each event had a different character — shaped by the communities and the venues — but each one asked the same question: what do women's migration stories look like when women get to tell them?",
      "The answer, it turned out, was: more complicated, funnier, angrier, and more food-focused than the usual version.",
      "We're planning a second run in 2026. If you'd like to get involved as a contributor, curator, or community partner, get in touch.",
    ],
    object: {
      label: 'Pop-up display, Leeds, May 2024',
      caption: 'Community book display at the Who Runs the World? pop-up, Leeds, May 2024. Photo by Lola Oyewole.',
    },
    bio: "Who Runs the World? was designed and produced by the Migration Museum's programmes team, with community curators in each city. The project was supported by the Paul Hamlyn Foundation.",
  },
]

export const FORMATS: StoryFormat[] = ['Oral history', 'Feature', 'Food story', 'Youth voices', 'Exhibition']
