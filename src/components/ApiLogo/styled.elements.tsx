import * as React from 'react';
import styled from '../../styled-components';

export const LogoImgEl = styled.img`
  max-height: ${props => props.theme.logo.maxHeight};
  max-width: ${props => props.theme.logo.maxWidth};
  padding-top: ${props => props.theme.logo.paddingTop};
  padding-bottom: ${props => props.theme.logo.paddingBottom};
  padding-left: ${props => props.theme.logo.paddingLeft};
  padding-right: ${props => props.theme.logo.paddingRight};
  width: 100%;
  display: block;
`;

export const LogoWrap = styled.div`
  text-align: ${props => props.theme.logo.isCentered ? 'center' : 'left'};
`;

const Link = styled.a`
  display: inline-block;
  width: 50%;
`;

export const LinkWrap = url => Component => <Link href={url}>{Component}</Link>;
