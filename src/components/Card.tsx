import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { navigate, Link } from "gatsby"
import Tag from './Tag';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      cursor: "pointer",
      minHeight: 100
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1',
      paddingBottom: theme.spacing(1)
    },
    cover: {
      width: "150px",
    },
    tags: {
      marginTop: theme.spacing(1),
      '& > *': {
        margin: theme.spacing(0.5),
      }
    },
    cardLink: {
      textDecoration: "none"
    }
  }),
);

type BlogPostCardProps = {
  title: string
  desc: string
  imgSrc: any
  slug: string
  tags?: readonly string[]
}

const BlogPostCard: React.VFC<BlogPostCardProps> = ({slug, title, desc, imgSrc, tags = []}) => {
  const classes = useStyles();

  return (
    <Link className={classes.cardLink} to={`/posts/${slug}`}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" >
            {desc}
          </Typography>
          <div className={classes.tags}>
            {(tags ?? []).map(tag => (
              <Tag key={tag} name={tag}/>
            ))}
          </div>
        </CardContent>
        <CardMedia className={classes.cover} image={imgSrc.src}>
        </CardMedia>
      </Card>
    </Link>
  );
}

export default BlogPostCard