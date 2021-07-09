import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import { graphql, useStaticQuery } from 'gatsby'
import { createStyles, IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Theme, Tooltip } from "@material-ui/core"
import { Twitter, GitHub, MoreVert } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingLeft: 0,
      paddingRight: 0
    },
    headerActions4Desktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    headerActions4Mobile: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
    spacer: {
      flexGrow: 1
    },
    appbar: {
      borderBottom: "1px solid gainsboro"
    }
  }),
)

type HideOnScrollProps = {
  children: React.ReactElement
}

const HideOnScroll :React.FC<HideOnScrollProps> = ({children}) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger} children={children} />
  )
}

const HideAppBar: React.VFC = React.memo(() => {

  const { site } = useStaticQuery<GatsbyTypes.HeaderQuery>(graphql`
    query Header {
      site {
        siteMetadata {
          title
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const classes = useStyles()

  const {
    title,
    social
  } = site.siteMetadata

  const [el, setEl] = useState<HTMLElement>(null)

  const twitterUrl = `https://twitter.com/${social.twitter}`
  const githubUrl = `https://github.com/${social.github}`

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar elevation={1} color="primary">
          <Container maxWidth="lg">
          <Toolbar variant="dense" className={classes.header}>
            <Typography variant="h6">{`📚 ${title}`}</Typography>
            <div className={classes.spacer}></div>
            <div className={classes.headerActions4Desktop}>
              <Tooltip title="Twitter" placement="bottom">
                <IconButton color="inherit" href={twitterUrl}>
                  <Twitter />
                </IconButton>
              </Tooltip>
              <Tooltip title="GitHub" placement="bottom">
                <IconButton color="inherit" href={githubUrl}>
                  <GitHub />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.headerActions4Mobile}>
              <IconButton color="inherit" onClick={e => setEl(e.currentTarget)}>
                <MoreVert />
              </IconButton>
            </div>
          </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar variant="dense" />
      <MobileMenu 
        anchorEl={el} 
        handleClose={() => setEl(null)}
        twitterUrl={twitterUrl}
        githubUrl={githubUrl}
      />
    </React.Fragment>
  )
})

type MobileMenuProps = {
  anchorEl: HTMLElement
  handleClose: () => void
  twitterUrl: string
  githubUrl: string
}

const MobileMenu: React.VFC<MobileMenuProps> = ({
  anchorEl, 
  handleClose, 
  twitterUrl,
  githubUrl
}) => {

  const withClose = (fn) => () => {
    fn()
    handleClose()
  }

  const navToTwitter = withClose(() => {
    window.open(twitterUrl)
  })
  const navToGitHub = withClose(() => {
    window.open(githubUrl)
  })

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      onClose={handleClose}
    >
      <MenuItem onClick={navToTwitter}>
        <ListItemIcon>
          <Twitter/>
        </ListItemIcon>
        <ListItemText primary="Twitter" />
      </MenuItem>
      <MenuItem onClick={navToGitHub}>
        <ListItemIcon>
          <GitHub/>
        </ListItemIcon>
        <ListItemText primary="GitHub" />
      </MenuItem>
    </Menu>
  )
}

export default HideAppBar