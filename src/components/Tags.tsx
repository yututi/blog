import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import Tag from "./Tag";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1)
    },
    tags: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      }
    },
    tagActions: {
      display: "flex",
      justifyContent: "flex-end"
    },
    tagActionBtn: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderRadius: theme.spacing(1)
    }
  }),
)

const Tags: React.FC = React.memo(() => {

  const classes = useStyles()

  const { allMarkdownRemark } = useStaticQuery<GatsbyTypes.ALlTagsQuery>(graphql`
    query ALlTags {
      allMarkdownRemark {
        group(
          field: frontmatter___tags
        ) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  let {
    group
  } = allMarkdownRemark

  return (
    <div className={classes.root}>
      <div className={classes.tags}>
      <Typography variant="body1" color="textPrimary">
        Tags:
      </Typography>
      {group.map(tagInfo => (
        <Tag
          key={tagInfo.tag}
          name={tagInfo.tag}
          count={tagInfo.totalCount}
        />
      ))}
      </div>
    </div>
  )
})

export default Tags