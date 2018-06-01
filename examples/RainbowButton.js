import React from 'react';
import styled from 'styled-components';
import { Box, Absolute, Link, Text } from 'rebass';
import { RainbowButton } from '../src';

const Container = styled(Box)`
  background: #f3f3f3;
  min-height: 100vh;
`;

const Footer = () => (
  <Absolute bottom={0} right={0}>
    <Box style={{ display: 'flex' }} p={4}>
      <Text fontSize={1}>
        <Link color="#3B32F8" href="https://varun.ca/" mr={4}>
          varun.ca
        </Link>
      </Text>
    </Box>
  </Absolute>
);

export default () => (
  <Container>
    <RainbowButton wavyText doubleRainbow m={4}>
      View Project
    </RainbowButton>
    <RainbowButton h={0} m={4}>
      View Project
    </RainbowButton>
    <RainbowButton wavyText y={-0.125} m={4}>
      View Project
    </RainbowButton>
    <RainbowButton wavyText m={4}>
      View Project
    </RainbowButton>
    <RainbowButton wavyText doubleRainbow offset={0.03} m={4}>
      View Project
    </RainbowButton>
    <RainbowButton wavyText doubleRainbow offset={0.02} m={4}>
      View Project
    </RainbowButton>
    <RainbowButton wavyText doubleRainbow offset={0} m={4}>
      View Project
    </RainbowButton>
    <RainbowButton wavyText doubleRainbow y={-0.125} m={4}>
      View Project
    </RainbowButton>

    <Text ml={4} mt={5} fontSize={1}>
      Based on{' '}
      <Link
        color="#3B32F8"
        href="https://dribbble.com/shots/4635664-CTA-explorations"
      >
        CTA explorations
      </Link>{' '}
      dribbble shot by Robin Noguier
    </Text>

    <Footer />
  </Container>
);
