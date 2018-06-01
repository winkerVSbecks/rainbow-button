import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton } from 'rebass';
import anime from 'animejs';
import { Rainbow } from './Rainbow';
import buildWave from './buildWave';
import { WavyText } from './WavyText';

const HtmlButton = styled(BaseButton)`
  position: relative;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export class RainbowButton extends React.Component {
  paths = [];
  letters = [];

  state = { focused: false };

  componentDidMount() {
    this.wavyTextAnimation = anime({
      targets: this.letters.querySelectorAll('span'),
      translateY: [
        {
          value: -8,
          easing: 'linear',
        },
        {
          value: 0,
          easing: 'linear',
        },
        {
          value: 8,
          easing: 'linear',
        },
        {
          value: 0,
          easing: 'linear',
        },
      ],
      duration: 300,
      delay: (_, idx) => idx * 30,
    });
    this.wavyTextAnimation.pause();
  }

  handleFocus = (cb, e) => {
    if (this.state.focused) return;

    if (this.props.wavyText) {
      this.wavyTextAnimation.restart();
    }

    anime({
      targets: this.letters,
      color: '#fff',
      easing: 'easeOutQuart',
      duration: 300,
    });

    if (cb) {
      cb();
    }

    this.setState({ focused: true });
  };

  handleBlur = (cb, e) => {
    if (!this.state.focused) return;

    if (this.props.wavyText) {
      this.wavyTextAnimation.restart();
      this.wavyTextAnimation.reverse();
    }

    anime({
      targets: this.letters,
      color: '#222',
      easing: 'easeOutQuart',
      duration: 300,
    });

    if (cb) {
      cb();
    }

    this.setState({ focused: false });
  };

  render() {
    const {
      w,
      h,
      x,
      y,
      doubleRainbow,
      offset,
      children,
      wavyText,
      ...props
    } = this.props;
    const rainbowProps = { w, h, x, y, doubleRainbow, offset };

    return (
      <Rainbow
        {...rainbowProps}
        render={({ rainbow, onFocus, onBlur }) => (
          <HtmlButton
            onMouseEnter={e => this.handleFocus(onFocus, e)}
            onFocus={e => this.handleFocus(onFocus, e)}
            onMouseLeave={e => this.handleBlur(onBlur, e)}
            onBlur={e => this.handleBlur(onBlur, e)}
            {...props}
          >
            {rainbow}
            <WavyText
              lettersRef={el => (this.letters = el)}
              style={{ width: 64 }}
            >
              {children}
            </WavyText>
          </HtmlButton>
        )}
      />
    );
  }
}

RainbowButton.defaultProps = {
  fontSize: 2,
  px: 4,
  py: 3,
  color: 'black',
  bg: 'white',
  borderRadius: 9999,
  border: '0.125rem solid #3b32f8',
  lineHeight: 1,
  doubleRainbow: false,
  offset: 0.04,
  wavyText: false,
};
