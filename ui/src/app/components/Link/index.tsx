import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import styled from '@emotion/styled';

type Props = {
  to: string;
};

const Span = styled.span`
  color: #fff;
  text-decoration: none;
`;

const Link: React.FC<Props> = ({ to, children }) => {

  return (
    <RouteLink to={to}>
      <Span>{children}</Span>
    </RouteLink>
  );
};

export default Link;
