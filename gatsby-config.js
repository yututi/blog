/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const siteTitle = "Continuous Gakusyu"

module.exports = {
  siteMetadata: {
    title: siteTitle,
    author: {
      name: "yututi",
      summary: "技術的なことのメモや社内勉強会資料を置いていきます",
      livingAt: "東京",
      job: "Web App Engineer"
    },
    description: "技術的なことのメモや社内勉強会資料を置いていきます",
    siteUrl: `https://continuousgakusyu.gatsbyjs.io`,
    repo: "blog",
    social: {
      twitter: "superTantanmen",
      github: "yututi"
    }
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-sass",
    "gatsby-plugin-typegen",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/posts/${node.frontmatter.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/posts/${node.frontmatter.slug}`,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  limit: 10
                ) {
                  nodes {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                      slug
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: "cg",
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-layout`
  ],
}
