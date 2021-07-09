const path = require(`path`)

exports.createPages = async gatsbyNodeHelpers => {
  const { graphql, actions } = gatsbyNodeHelpers
  const { createPage } = actions

  const result = await graphql(`
    query Node {
      posts: allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  console.log(result)

  const edges = result.data.posts.edges

  edges.forEach(({node}, index) => {
    // const prevSlug = index === 0 ? null : edges[index - 1].id
    // const nextSlug = index === edges.length - 1 ? null : edges[index + 1].id

    createPage({
      path: `posts/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: node.frontmatter.slug,
        // nextSlug,
        // prevSlug
      }
    })
  })

  const tags = result.data.tags.group

  tags.forEach(tag => {
    createPage({
      path: `tag/${tag.fieldValue}`,
      component: path.resolve(`./src/templates/Tag.tsx`),
      context: {
        tag: tag.fieldValue
      }
    })
  })
}