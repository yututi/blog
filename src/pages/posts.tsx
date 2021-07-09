import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/Seo"
import { Breadcrumbs, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumps: {
      fontSize: theme.typography.h5.fontSize
    },
    listItem: {
      marginTop: theme.spacing(1)
    }
  }),
)

type Props = {
  data: GatsbyTypes.PostsQuery
}

const PostTemplate : React.VFC<Props> = ({data}) => {

  const classes = useStyles()

  return (
    <>
      <Seo/>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumps}>
        <Link color="inherit" to="/">index</Link>
        <Typography color="textPrimary" component="h5" variant="h5">posts</Typography>
      </Breadcrumbs>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
          <li key={node.frontmatter.slug} className={classes.listItem}>
            <Link to={`/posts/${node.frontmatter.slug}`}>{`${node.frontmatter.title}(${node.frontmatter.date})`}</Link>
          </li>
        )})}
      </ul>
    </>
  )
}

export const query = graphql`
  query Posts {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
            date
          }
        }
      }
    }
  }
`

export default PostTemplate