import { defineField, defineType } from 'sanity'

export const exhibitionType = defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle / tagline', type: 'string' }),
    defineField({ name: 'lede', title: 'Lede', type: 'text', rows: 3 }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Current', 'Upcoming', 'Past'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'isFree', title: 'Free admission', type: 'boolean', initialValue: false }),
    defineField({ name: 'ticketUrl', title: 'Ticket / booking URL', type: 'url' }),
    defineField({ name: 'openingDate', title: 'Opening date', type: 'date' }),
    defineField({ name: 'closingDate', title: 'Closing date', type: 'date' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'accentColour',
      title: 'Hero accent colour',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'var(--mm-orange)' },
          { title: 'Blue', value: 'var(--mm-blue)' },
          { title: 'Yellow', value: 'var(--mm-yellow)' },
          { title: 'Green', value: 'var(--mm-green)' },
          { title: 'Black', value: 'var(--mm-black)' },
        ],
        layout: 'radio',
      },
      initialValue: 'var(--mm-orange)',
    }),
    defineField({
      name: 'body',
      title: 'About this exhibition',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ]}],
    }),
    defineField({
      name: 'accessInfo',
      title: 'Access information',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'featuredEvent',
      title: 'Featured event (sidebar)',
      type: 'reference',
      to: [{ type: 'event' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
