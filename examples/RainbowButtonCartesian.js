import React from 'react';
import styled from 'styled-components';
import { Cartesian } from '@compositor/kit';
import { Box, Relative, Border } from 'rebass';
import { RainbowButton } from '../src';

export default props => (
  <Cartesian
    component={RainbowButton}
    m={3}
    wavyText={[true, false]}
    doubleRainbow={[true, false]}
    w={[0.2, 0.4, 0.5]}
    h={[0, 0.5]}
    y={[0, -0.125]}
    offset={[0, 0.01, 0.02, 0.03, 0.04]}
    children={'View Project'}
  />
);
