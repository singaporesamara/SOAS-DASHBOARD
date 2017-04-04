import { Component } from 'react';
import { isObject } from 'lodash';

export default class BaseComponent extends Component {
  onValueChange(field, escape = false) {
    return (data) => {
      const value = isObject(data) && !escape ? data.target.value : data;
      this.setState({ [field]: value });
    };
  }
}
