import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
    return [
      {
        url: `${process.env.NEXTAUTH_URL}`,
        lastModified: new Date(),
        priority: 1,
      },
      {
        url: `${process.env.NEXTAUTH_URL}/company/about`,
        priority: 1,
        changeFrequency:"monthly",
      },
      {
        url: `${process.env.NEXTAUTH_URL}/company/terms-and-condition`,
        changeFrequency:"monthly"
      },
      
    ]
  }