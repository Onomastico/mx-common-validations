# Validaciones Comunes para México

Librería para la validación de parámetros en componentes de México.

## `CurpValidators`

Validadores para CURP.

### `regexFormat`

Expresión regular para validar formato del CURP.
```javascript
regexFormat = /^([A-Z][AEIOUX][A-Z]{2})((?:\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([HM])(AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)([B-DF-HJ-NP-TV-Z]{3})([A-Z\d])(\d)$/i;
```

Reglas del formato del CURP:
  - Primera letra del primer apellido.
  - Primera vocal del primer apellido.
  - Primera letra del segundo apellido.
  - Primera letra del nombre de pila: Se tomará en cuenta el primer nombre («exceptuando los nombres compuestos cuando a estos se antepongan los nombres de MARÍA o JOSÉ, entre otros, en cuyo caso se usará el segundo nombre.»).
  - Fecha de nacimiento sin espacios en orden de año (dos dígitos), mes y día. Ejemplo: 960917 (1996, septiembre 17).
  - Letra del sexo o género (H para Hombre, o M para Mujer).
  - Dos letras correspondientes a la entidad federativa de nacimiento (en caso de haber nacido fuera del país, se marca como NE, «Nacido en el Extranjero»).
  - Primera consonante interna (después de la primera letra) del primer apellido.
  - Primera consonante interna del segundo apellido.
  - Primera consonante interna del nombre de pila.
  - Dígito del 0 al 9 para fechas de nacimiento hasta el año 1999 y de la A a la Z para fechas de nacimiento a partir del 2000, asignado por la SEGOB para evitar registros repetidos.
  - Dígito verificador, para comprobar la integridad.

> **NOTA:** La expresión regular no incluye validaciones de fecha de nacimiento de año bisiesto ni número de días en el mes. 

### `validateFormat`

Valida formato del CURP incluyendo la fecha de nacimiento.

| Parámetro           | Tipo    | Valor esperado
|---------------------|---------|-----------------
| curp                | String  | CURP

Ejemplos de uso
```javascript
  import { CurpValidators } from 'mx-common-validations'

  const validCurp = 'ZAAZ991231HDFBCD09'
  console.log(CurpValidators.validateFormat(validCurp)) // true

  const inValidCurp = 'XXXX000000XXXXXX00'
  console.log(CurpValidators.validateFormat(inValidCurp)) // false
```

### `validateFormatAndAge`

Ejecuta las mismas validaciones de **validateFormat** y además valida que la edad correspondiente a la fecha de nacimiento se encuentre dentro del rango especificado.

| Parámetro           | Tipo    | Valor esperado
|---------------------|---------|-----------------
| curp                | String  | CURP
| minAge              | Integer | Minima edad permitida para validar el curp
| maxAge              | Integer | Maxima edad permitida para validar el curp

Ejemplos de uso
```javascript
  import { CurpValidators } from 'mx-common-validations'

  const minAge = 21
  const maxAge = 71

  const validCurp = 'ZAAZ991231HDFBCD09'
  console.log(CurpValidators.validateDateAndAge(validCurp, minAge, maxAge)) // true

  const inValidCurp = 'ZAAZ491231HDFBCD09'
  console.log(CurpValidators.validateDateAndAge(inValidCurp, minAge, maxAge)) // false
```
