import React from 'react';
import styled from 'styled-components';
import { Absolute, Relative, Button as BaseButton } from 'rebass';
import anime from 'animejs';
import theme from './theme';
import { Wave } from './Wave';
import buildWave from './buildWave';

const colors = [
  theme.colors.orange,
  theme.colors.purple,
  theme.colors.aqua,
  theme.colors.pink,
  theme.colors.blue,
];

let current = 0;

function generateId(prefix = 'wave') {
  return `${prefix}-${current++}`;
}

const AbsoluteFillCanvas = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

export class Rainbow extends React.Component {
  paths = [];
  patterns = [];

  componentDidMount() {
    const { w, h, y, doubleRainbow } = this.props;

    this.appear = anime({
      targets: this.paths,
      d: buildWave({ w, h, y, doubleRainbow }),
      delay: (_, idx, l) => 60 * idx,
      easing: 'easeOutQuart',
      duration: 300,
    });
    this.appear.pause();

    this.move = anime({
      targets: this.patterns,
      x: `+=${this.props.w * 100}`,
      easing: 'linear',
      duration: 500,
      loop: true,
    });
    this.move.pause();
  }

  handleFocus = () => {
    this.move.restart();
    this.appear.restart();
  };

  handleBlur = () => {
    this.move.pause();
    this.appear.restart();
    this.appear.reverse();
  };

  render() {
    const { w, h, x, y, doubleRainbow, offset } = this.props;
    const waveProps = { w, h, x, y, doubleRainbow };

    return this.props.render({
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      rainbow: (
        <AbsoluteFillCanvas viewBox="0 0 100 100" preserveAspectRatio="none">
          {colors.map((color, idx, list) => (
            <Wave
              key={idx}
              color={color}
              pathRef={el => this.paths.push(el)}
              patternRef={el => this.patterns.push(el)}
              {...waveProps}
              offset={offset * (list.length - idx)}
              id={generateId()}
            />
          ))}
        </AbsoluteFillCanvas>
      ),
    });
  }
}

Rainbow.defaultProps = {
  w: 0.4,
  h: 0.5,
  x: 0,
  y: 0,
  offset: 0,
};
