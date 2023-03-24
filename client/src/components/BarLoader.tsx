import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const BarLoader = styled.div`
  width: 100%;
  height: 4px;
  z-index: 99999;
  position: absolute;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    animation: ${loading} 2s linear infinite;
    background: linear-gradient(
      to left,
      rgba(255, 153, 160, 0.6),
      rgba(255, 134, 144, 0.7),
      rgba(255, 115, 128, 0.8),
      rgba(255, 96, 117, 0.9),
      rgba(255, 79, 110, 1),
      rgba(255, 96, 117, 0.9),
      rgba(255, 115, 128, 0.8),
      rgba(255, 134, 144, 0.7),
      rgba(255, 153, 160, 0.6),
      rgba(245, 168, 175, 0.5),
      rgba(237, 169, 176, 0.4),
      rgba(226, 172, 178, 0.3),
      rgba(216, 175, 179, 0.2),
      rgba(205, 174, 175, 0.1)
    );
  }
`;
