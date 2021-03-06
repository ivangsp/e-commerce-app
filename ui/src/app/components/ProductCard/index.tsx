import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Product } from 'types';

type Props = {
  product: Product;
  handleOnClick: (product: Product) => void;
};

export default function ProductCard({ product, handleOnClick }: Props) {
  const { name, description, image } = product;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image ?? ''}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Buy Now</Button>
        <Button onClick={() => handleOnClick(product)}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
