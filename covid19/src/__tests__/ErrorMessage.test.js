import { ErrorMessage  } from '../components/ErrorMessage.jsx';

import React from 'react';
import { shallow } from 'enzyme';

describe('ErrorMessage test', () => {

    it('should render correctly', () => {
        const component = shallow(<ErrorMessage />);
      
        expect(component).toMatchSnapshot();
    });

    it('should refetch by pressing the button', () => {
        const func = jest.fn()
        const component = shallow(<ErrorMessage tryAgain={func} />);
      
        component
            .find('button')
            .simulate('click');

        expect(func).toHaveBeenCalled();

    });
})