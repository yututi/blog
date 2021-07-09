import React from "react"
import { graphql, Link } from "gatsby"
import { Grid } from "@material-ui/core"
import BlogPostCard from "../components/Card"
import { Breadcrumbs, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"

type Props = {
  data: GatsbyTypes.TagQuery
  pageContext: {[key:string]: string}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumps: {
      fontSize: theme.typography.h5.fontSize
    },
    posts: {
      marginTop: theme.spacing(1)
    }
  }),
)

const PostTemplate: React.VFC<Props> = ({ data, pageContext }) => {


  const classes = useStyles()

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumps}>
        <Link color="inherit" to="/">
          index
        </Link>
        <Typography color="textSecondary" component="h5" variant="h5">tag</Typography>
        <Typography color="textPrimary" component="h5" variant="h5">{pageContext.tag}</Typography>
      </Breadcrumbs>
      <Grid container spacing={1} direction="column" className={classes.posts}>
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
  query Tag (
    $tag: String!
  ) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
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