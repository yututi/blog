import React from 'react';
import Container from '@material-ui/core/Container';
import { graphql, useStaticQuery } from 'gatsby'
import { createStyles, Grid, makeStyles, Theme, Tooltip } from "@material-ui/core";
import { RssFeed } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(2)
    },
    spacer: {
      flexGrow: 1
    }
  }),
)

const Footer: React.VFC = React.memo(() => {

  const { site } = useStaticQuery<GatsbyTypes.FooterQuery>(graphql`
    query Footer {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  const classes = useStyles()

  const {
    author: { name }
  } = site.siteMetadata

  return (
    <div className={classes.footer}>
      <Container maxWidth="md">
        <Grid container>
          <small>© 2021 {name}</small>
          <div className={classes.spacer}></div>
          <Tooltip title="RSS" placement="top">
            <a href="/rss.xml">
              <RssFeed color="action"></RssFeed>
            </a>
          </Tooltip>
        </Grid>
      </Container>
    </div>
  );
})


export default Footer 