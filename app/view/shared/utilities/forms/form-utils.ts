export function getFormString(formData: FormData, name: string, defaultValue: string): string {
  //
  const formDataEntryValue = formData.get(name);

  if (formDataEntryValue === null) {
    throw new Error(`${name} is unexpectedly missing`);
  } else if (formDataEntryValue instanceof File) {
    throw new Error(`${name} is unexpectedly a file`);
  } else {
    const trimmedValue = formDataEntryValue.trim();
    return trimmedValue.length > 0 ? trimmedValue : defaultValue;
  }
}
