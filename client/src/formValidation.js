export const required = value => value !== undefined && value !== "" ? undefined : "Laukelis negali būti tuščias";
const maxLength = max => value => value && value.length > max ? `Laukelis negali viršyti ${max} simbolių` : undefined;
export const maxLength250 = maxLength(250), maxLength30 = maxLength(30);
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Neteisingas el. pašto formatas' : undefined;
export const password = value => value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(value)
  ? 'Slaptažodį turi sudaryt bent 6 simboliai, viena raidė ir skaičius' : undefined;
export const passwordsMatch = (value, allValues) => (allValues.password1 && (value !== allValues.password1))
|| (allValues.password2 && (value !== allValues.password2)) ? 'Slaptažodžiai nesutampa' : undefined;
