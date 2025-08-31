import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://farming-simulator-25.vercel.app',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://farming-simulator-25.vercel.app/product-search',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://farming-simulator-25.vercel.app/recipe',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://farming-simulator-25.vercel.app/selling-price',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://farming-simulator-25.vercel.app/contact',
      lastModified: new Date(),
      priority: 0.5,
    },
  ]
}