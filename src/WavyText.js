import React from 'react';
import styled from 'styled-components';
import { Relative } from 'rebass';

const Text = styled.span`
  position: relative;
  display: inline-flex;
  padding-left: 16px;
  padding-right: 16px;
`;

const Letter = styled.span`
  display: inline-block;
`;

export const WavyText = ({ lettersRef, children, ...props }) => (
  <Text innerRef={lettersRef}>
    {children
      .split('')
      .map((letter, idx) => (
        <Letter key={letter + idx}>{letter === ' ' ? '\u00A0' : letter}</Letter>
      ))}
  </Text>
);
