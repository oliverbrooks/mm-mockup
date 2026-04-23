import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', title: 'Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'End date / time', type: 'datetime' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'type', title: 'Event type', type: 'string', options: { list: ['Talk', 'Workshop', 'Tour', 'Film', 'Performance', 'Other'] } }),
    defineField({ name: 'lede', title: 'Short description', type: 'text', rows: 3 }),
    defineField({
      name: 'body',
      title: 'Full description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url' }),
    defineField({ name: 'isFree', title: 'Free event', type: 'boolean', initialValue: false }),
    defineField({ name: 'price', title: 'Price description', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
})
