import React from "react"
import Container from '@material-ui/core/Container'
import Header from "../components/Header"
import Grid from '@material-ui/core/Grid'
import { createTheme, createStyles, CssBaseline, makeStyles, ThemeProvider, Theme, useTheme } from "@material-ui/core"
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { useMediaQuery } from "@material-ui/core"
import Bio from "../components/Bio"
import Tags from "../components/Tags"
import Footer from "../components/Footer"
import { useMemo } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      padding: theme.spacing(2)
    },
    leftPanePaper: {
      top: 64,
      position: "sticky",
      maxWidth: 300,
      [theme.breakpoints.down('sm')]: {
        position: "static",
        maxWidth: "initial"
      }
    },
    mainPane: {
      width: "100%"
    }
  })
)

const Layout: React.FC = React.memo(({children}) => {

  const classes = useStyles()

  return (
      <>
        <Header />
        <Container maxWidth="md" className={classes.container}>
          <Grid container>
            <Grid item sm={12} md={4}>
              <div className={classes.leftPanePaper}>
                <Bio/>
                <Tags/>
              </div>
            </Grid>
            <Grid item sm={12} md={8} className={classes.mainPane}>
                {children}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
  )
})

const ThemedLayout:React.FC = ({children}) => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(()=> {
    return createTheme({
      breakpoints: createBreakpoints({
        values: {
          xs: 0,
          sm: 600,
          md: 957,
          lg: 1200,
          xl: 1920
        }
      }),
      palette: {
        primary: {
          main: '#ffffff',
          dark: "#323232",
          light: "#ffffff",
          contrastText: '#555555'
        },
        secondary: {
          main: "#FF8A65",
          contrastText: "#ffffff"
        },
        type: prefersDarkMode ? 'dark' : 'light',
      }
    })
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout>
        {children}
      </Layout>
    </ThemeProvider>
  )
}

export default ThemedLayout