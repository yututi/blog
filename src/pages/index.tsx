import React from "react"
import { graphql } from "gatsby"
import Grid from '@material-ui/core/Grid';
import BlogPostCard from "../components/Card"
import Seo from "../components/Seo"

type Props = {
  data: GatsbyTypes.IndexQuery
}

const PostTemplate : React.VFC<Props> = ({data}) => {

  return (
    <>
      <Seo/>
      <Grid container spacing={1} direction="column">
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
          <Grid key={node.frontmatter.slug} item>
            <BlogPostCard
              slug={node.frontmatter.slug}
              title={node.frontmatter.title}
              desc={node.excerpt}
              imgSrc={node.frontmatter.thumbnail.childImageSharp.fixed}
              tags={node.frontmatter.tags}
            />
          </Grid>
        )})}
      </Grid>
    </>
  )
}

export const query = graphql`
  query Index {
    allMarkdownRemark (
      limit: 100
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 300, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`

export default PostTemplate