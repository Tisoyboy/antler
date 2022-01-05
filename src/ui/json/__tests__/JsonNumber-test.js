import JsonNumber from '../JsonNumber';
import React from 'react';
import { shallow } from 'enzyme';

it('should render positive value', () => {
  const wrapper = shallow(<JsonNumber json={42} />);
  expect(wrapper.text()).toBe('42');
});

it('should render negative value', () => {
  const wrapper = shallow(<JsonNumber json={-42} />);
  expect(wrapper.text()).toBe('-42');
});

it('should render zero value', () => {
  const wrapper = shallow(<JsonNumber json={0} />);
  expect(wrapper.text()).toBe('0');
});

it('should render decimal value', () => {
  const number = Math.random();
  const wrapper = shallow(<JsonNumber json={number} />);
  expect(wrapper.text()).toBe(number.toString(10));
});

it('should render NaN value', () => {
  const wrapper = shallow(<JsonNumber json={NaN} />);
  expect(wrapper.text()).toBe('NaN');
});

it('should be able to handle MAX_SAFE_INTEGER', () => {
  const wrapper = shallow(<JsonNumber json={Number.MAX_SA