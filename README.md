Hi,
Please find the instructions for your next assignment below.

Your task is to create a ReactJS component for selecting date & time ranges.
Component should be named as "DateTimeRangeSelector",
and should accept 2 props: "value" and "onChange".

"value" prop is expected to be an array of 2 items ([fromDateTime, toDateTime]).
"onChange" prop is expected to be a function that handles any change of selected value.
"onChange" function will be called with the updated value (e.g "onChange(updatedValue)").

Component should look like a text input - and should show the appropriate label according to current selection (see attached example for reference).

When clicked and displayed, component should support 2 modes for selection, either Relative or Absolute.
Relative can be for example "1 hour ago" (see all possible options in the attached reference images),
while Absolute represents an absolute range of date and time (e.g from "2023-04-01 08:00:00" to "2023-04-01 23:59:59").

Note: both Relative and Absolute modes should support a custom input, see attached reference images to understand this more.

Important notes:
- please use https://jsfiddle.net (or similar) to deploy the code at.
- please see attached reference images of this component.
- should be written with React functional components (not class components).
- component should accept only the 2 props mentioned above, not more.
- after component is done, please show an example implementation of it in a fake dummy form with a state that's changing according to component "onChange".
- please find a decent css library so the component will look as good as possible, doesn't matter which one.
- bonus: separate between templates and logic by creating custom hooks.

good luck :)