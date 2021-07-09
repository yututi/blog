import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

type SeoProps = {
  description?: string
  lang?: string
  title?: string
  isArticle?: boolean
}

const Seo: React.VFC<SeoProps> = ({ description, lang = "ja", title, isArticle = false }) => {

  const { site } = useStaticQuery<GatsbyTypes.CeoQuery>(
    graphql`
      query Ceo {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const actualDescription = description || site.siteMetadata.description
  const actualTitle = title || site.siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{lang}}
      title={actualTitle}
      meta={[
        {
          name: "description",
          content: actualDescription
        },
        {
          property: "og:title",
          content: actualTitle
        },
        {
          property: "og:description",
          content: actualDescription
        },
        {
          property: "og:image",
          content: `${site.siteMetadata.siteUrl}/site-icon.webp`
        },
        {
          property: "og:type",
          content: isArticle ? "article" : "website"
        },
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:creater",
          content: site.siteMetadata?.social?.twitter
        },
        {
          name: `twitter:title`,
          content: actualTitle,
        },
        {
          name: `twitter:description`,
          content: actualDescription,
        },
      ]}
    />
  );
}

export default Seo