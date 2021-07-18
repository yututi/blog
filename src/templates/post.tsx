import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/Seo"
import "./post.css"
import { 
  Breadcrumbs, 
  Button, 
  createStyles, 
  makeStyles, 
  Theme, 
  Typography, 
  useTheme,
  Link as MLink
} from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import { Twitter } from "@material-ui/icons"

type Props = {
  data: GatsbyTypes.PostTemplateQuery
  pageContext: {[key:string]: string}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumps: {
      fontSize: theme.typography.h5.fontSize
    },
    share: {
      marginTop: theme.spacing(1),
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    alert: {
      marginTop: theme.spacing(1)
    },
    postFooter: {
      marginTop: theme.spacing(3)
    }
  }),
)

const PostTemplate: React.VFC<Props> = ({ data, pageContext }) => {
  const post = data.markdownRemark

  const classes = useStyles()

  const theme = useTheme()

  const markdownClasses = [
    "markdown-body",
    theme.palette.type === "dark" && "dark"
  ].filter(Boolean).join(" ")

  const {
    repo,
    siteUrl,
    social
  } = data.site.siteMetadata

  const url = `${siteUrl}/posts/${post.frontmatter.slug}`

  const issueUrl = `https://github.com/${social.github}/${repo}/issues/new?title=${pageContext.slug}`

  const now = new Date()
  now.setFullYear(now.getFullYear() - 1)
  const postedAt = new Date(post.frontmatter.date)
  const showExpiredPostAlert = now.getTime() > postedAt.getTime()

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        isArticle={true}
      />
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumps}>
        <Link color="inherit" to="/">
          index
        </Link>
        <Typography color="textSecondary" component="h5" variant="h5">posts</Typography>
        <Typography color="textPrimary" component="h5" variant="h5">{post.frontmatter.title}</Typography>
      </Breadcrumbs>
      <div className={classes.share}>
        <Typography color="textPrimary">Share on:</Typography>
        <Button
          size="small"
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          startIcon={<Twitter/>}
        >
          Twitter
        </Button>
      </div>
      {showExpiredPostAlert && (
        <Alert className={classes.alert} variant="filled" severity="warning">
          この記事は作成から1年以上経過しています。
        </Alert>
      )}
      <div className={markdownClasses} dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className={classes.postFooter}>
        <Typography 
          color="textPrimary"
        >
          💬この記事に対してご意見ありましたら<MLink href={issueUrl}>issue</MLink>にお願いします.
        </Typography>
      </div>
    </>
  )
}
export const query = graphql`
  query PostTemplate (
    $slug: String!
  ) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 100)
      frontmatter {
        title
        slug
        date
      }
    }
    site {
      siteMetadata {
        siteUrl
        repo
        social {
          github
        }
      }
    }
  }
`

export default PostTemplate