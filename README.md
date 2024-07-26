## Course

- [nextjs-react-the-complete-guide](https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41159784#overview)

## Resources

- [npm slugify](https://www.npmjs.com/package/slugify)
- [npm xss - Sanitize untrusted HTML](https://www.npmjs.com/package/xss)


In the next lecture, we'll use a React DOM Hook called useFormState.

For some unknown reason, the React team decided to suddenly change this Hook's name to useActionState. In addition, it now must be imported from react instead of react-dom.

So when I write this code in the next lecture

import { useFormState } from 'react-dom';
you should write this code (and then use useActionState() instead of useFormState() in any other place where I use it):