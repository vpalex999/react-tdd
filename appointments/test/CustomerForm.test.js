import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
	let render, container;

	beforeEach(() => {
		({ render, container } = createContainer());
	});

	const form = (id) => container.querySelector(`form[id="${id}"]`);
	const field = (name) => form('customer').elements[name];

	const labelFor = (formElement) =>
		container.querySelector(`label[for="${formElement}"]`);

	const expectToBeInputFieldOfTypeText = (formElement) => {
		expect(formElement).not.toBeNull();
		expect(formElement.tagName).toEqual('INPUT');
		expect(formElement.type).toEqual('text');
	};

	const itRendersAsATextBox = (fieldName) =>
		it('renders as a text box', () => {
			render(<CustomerForm />);

			expectToBeInputFieldOfTypeText(field(fieldName));
		});

	const itIncludesTheExistingValue = (fieldName) =>
		it('includes the existing value', () => {
			render(<CustomerForm {...{ [fieldName]: 'value' }} />);

			expect(field(fieldName).value).toEqual('value');
		});

	const itRendersALabel = (fieldName, value) =>
		it('renders a label for the field', () => {
			render(<CustomerForm />);

			expect(labelFor(fieldName)).not.toBeNull();
			expect(labelFor(fieldName).textContent).toEqual(value);
		});

	const itAssignAnIdThatMatchesTheLabelId = (fieldName, id) =>
		it('assigns an id that matches the label id to the field', () => {
			render(<CustomerForm />);

			expect(field(fieldName).id).toEqual(id);
		});

	const itSubmitExistingValue = (fieldName, value) =>
		it('saves existing name when submitted', async () => {
			expect.hasAssertions();

			render(
				<CustomerForm
					{...{ [fieldName]: value }}
					onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
				/>
			);

			ReactTestUtils.Simulate.submit(form('customer'));
		});

	const itSubmitsNewValue = (fieldName) =>
		it('saves new value when submitted', async () => {
			expect.hasAssertions();

			render(
				<CustomerForm
					{...{ [fieldName]: 'existingValue' }}
					onSubmit={(props) => expect(props[fieldName]).toEqual('newValue')}
				/>
			);

			ReactTestUtils.Simulate.change(field(fieldName), {
				target: { value: 'newValue', name: fieldName },
			});
			ReactTestUtils.Simulate.submit(form('customer'));
		});

	it('renders a form', () => {
		render(<CustomerForm />);

		expect(form('customer')).not.toBeNull();
	});

	describe('first name field', () => {
		itRendersAsATextBox('firstName');
		itIncludesTheExistingValue('firstName');
		itRendersALabel('firstName', 'First name');
		itAssignAnIdThatMatchesTheLabelId('firstName', 'firstName');
		itSubmitExistingValue('firstName', 'Ashley');
		itSubmitsNewValue('firstName');
	});

	describe('last name field', () => {
		itRendersAsATextBox('lastName');
		itIncludesTheExistingValue('lastName');
		itRendersALabel('lastName', 'Last name');
		itAssignAnIdThatMatchesTheLabelId('lastName', 'lastName');
		itSubmitExistingValue('lastName', 'Ashley');
		itSubmitsNewValue('lastName');
	});

	describe('phone number field', () => {
		itRendersAsATextBox('phoneNumber');
		itIncludesTheExistingValue('phoneNumber');
		itRendersALabel('phoneNumber', 'Phone number');
		itAssignAnIdThatMatchesTheLabelId('phoneNumber', 'phoneNumber');
		itSubmitExistingValue('phoneNumber', '12345');
		itSubmitsNewValue('phoneNumber');
	});

	it('has a submit button', () => {
		render(<CustomerForm />);
		const submitButton = container.querySelector('input[type="submit"]');

		expect(submitButton).not.toBeNull();
	});
});
