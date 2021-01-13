import TypeInsurance from 'type-insurance';

export default function padZero (input: number): string {
	const { string } = new TypeInsurance(input);
	return string.length === 2 ? string : '0' + string;
}
