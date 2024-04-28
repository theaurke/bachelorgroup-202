import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavTab from '../NavTab.jsx';
import '@testing-library/jest-dom';


describe('NavTab Component Test', () => {

    test('renders tab title correctly', () => {
        const props = {
            id: 1,
            title: 'Test Tab Title',
            isActive: true,
            onDelete: jest.fn(),
            isSidebarCollapsed: false,
            onEdit: jest.fn()
        };

        const { getByText } = render(<NavTab {...props} />);

        expect(getByText(props.title)).toBeInTheDocument();
    });

    test('allows editing tab title', () => {
        const props = {
            id: 1,
            title: 'Test Tab Title',
            isActive: true,
            onDelete: jest.fn(),
            isSidebarCollapsed: false,
            onEdit: jest.fn()
        };

        const { getByText, getByAltText, getByTestId } = render(<NavTab {...props} />);
        expect(getByText(props.title)).toBeInTheDocument;

        fireEvent.click(getByAltText('More options'));

        fireEvent.click(getByText('Edit'));

        const inputField = getByTestId('inputField');
        expect(inputField).toBeInTheDocument();

        fireEvent.change(inputField, { target: { value: 'Edited Tab Title' } });
        fireEvent.blur(inputField);

        expect(props.onEdit).toHaveBeenCalledWith(props.id, 'Edited Tab Title');

    });

    test('allows deleting tab', () => {
        const props = {
            id: 1,
            title: 'Test Tab Title',
            isActive: true,
            onDelete: jest.fn(),
            isSidebarCollapsed: false,
            onEdit: jest.fn()
        };

        const { getByAltText, getByText } = render(<NavTab {...props} />);

        fireEvent.click(getByAltText('More options'));

        fireEvent.click(getByText('Delete'));

        expect(props.onDelete).toHaveBeenCalledWith(props.id);

    });

    test('allows copying a tab', () => {
        const props = {
            id: 1,
            title: 'Test Tab Title',
            isActive: true,
            onDelete: jest.fn(),
            isSidebarCollapsed: false,
            onEdit: jest.fn(),
            onCopy: jest.fn(),
        };

        const { getByAltText, getByText } = render(<NavTab {...props} />);

        fireEvent.click(getByAltText('More options'));

        fireEvent.click(getByText('Copy'));

        expect(props.onCopy).toHaveBeenCalledWith(props.id);

    });
    
});
