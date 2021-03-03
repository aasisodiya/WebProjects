# Common/Frequent Error

## Error & Solution/s

**Error**: `(index):1 GET https://localhost/myproject/undefined 404`

**Solution**:

- Make sure that all the generated CSS (styles) that set a background-image or the like, where there's an url() actually point somewhere; if it doesn't point anywhere the error will set to the .html DOCTYPE.
- Check the src of your image tags; make sure that they are not set by JavaScript to undefined.
- Also check the src of your script files, even when it'd be much rarer in that case to happen.

## Reference

- [Solution to http://localhost/undefined 404 (Not Found)](https://stackoverflow.com/a/36964874)
