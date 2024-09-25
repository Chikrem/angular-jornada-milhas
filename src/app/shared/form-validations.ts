import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {

  // ValidatorFn é um tipo de função que define uma validação personalizada para um controle de formulário.
  // É usado como um validador personalizado para definir regras de validação além das validações padrão fornecidas pelo Angular.

  static equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value
      const otherFieldValue = control.root.get(otherField)?.value

      if(fieldValue !== otherFieldValue) {
        return { equalTo: true }
      }

      return null
    }
  }
}


// https://v17.angular.io/api/forms/ValidatorFn
