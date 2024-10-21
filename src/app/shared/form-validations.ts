import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"; // Importa tipos e interfaces necessárias para validações

export class FormValidations {
  // Método estático para criar um validador personalizado que verifica se dois campos são iguais
  static equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value; // Obtém o valor do campo atual
      const otherFieldValue = control.root.get(otherField)?.value; // Obtém o valor do outro campo a partir do controle raiz

      // Se os valores não forem iguais, retorna um objeto de erro
      if (fieldValue !== otherFieldValue) {
        return { equalTo: true }; // Indica que os campos não são iguais
      }

      return null; // Se os campos são iguais, não há erros
    };
  }
}
