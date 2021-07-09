import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Room, Work } from '@material-ui/icons';
import { StaticImage } from "gatsby-plugin-image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
      paddingBottom: theme.spacing(2)
    },
    avatar: {
      marginTop: theme.spacing(1),
      width: theme.spacing(15),
      height: theme.spacing(15)
    },
    description: {
      marginTop: theme.spacing(1)
    },
    descText: {
      marginLeft: theme.spacing(1)
    },
    descBlock: {
      display: "flex",
      alignItems: "center"
    },
    summaryBlock: {
      marginTop: theme.spacing(2),
    }
  }),
)

const Bio: React.FC = React.memo(() => {

  const classes = useStyles()

  const { site } = useStaticQuery<GatsbyTypes.BioQuery>(graphql`
    query Bio {
      site {
        siteMetadata {
          author {
            name
            summary
            livingAt
            job
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const {
    author,
    social
  } = site.siteMetadata

  return (
    <Grid container className={classes.root} justifyContent="center">
      <Grid item xs={6} md={12}>
        <Grid container direction="column" alignItems="center">
          <Typography component="h5" variant="h5">
            {author.name}
          </Typography>
          <Avatar className={classes.avatar} src="/avatar.webp" alt="me">
          </Avatar>
        </Grid>
      </Grid>
      <Grid item xs={6} md={10} className={classes.description}>
        <div className={classes.descBlock}>
          <Room color="secondary"/>
          <Typography variant="body2" color="textSecondary" className={classes.descText}>
            {author.livingAt}
          </Typography>
        </div>
        <div className={classes.descBlock}>
          <Work color="secondary"/>
          <Typography variant="body2" color="textSecondary" className={classes.descText}>
            {author.job}
          </Typography>
        </div>
        <div className={classes.descBlock}>
          <Typography variant="body2" color="textSecondary" className={classes.summaryBlock}>
            {author.summary}
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
})

export default Bio