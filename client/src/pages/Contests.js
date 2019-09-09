import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default ({ cards }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {cards.length > 0 ? cards.map(card => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image Title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typograph>{card.description}</Typograph>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="outlined">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )) : null }
      </Grid>
    </Container>
  );
};
