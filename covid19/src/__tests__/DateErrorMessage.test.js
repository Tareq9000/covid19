import { DateErrorMessage  } from '../components/DateErrorMessage.jsx';

import React from 'react';
import { mount } from 'enzyme';

describe('DateErrorMessage test', () => {

    it('should render correctly', () => {
        const component = mount(<DateErrorMessage />);
      
        expect(component).toMatchSnapshot();

        component.unmount()
    });
})