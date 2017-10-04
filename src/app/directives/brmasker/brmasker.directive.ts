
import { Directive, Input, HostListener } from '@angular/core';
@Directive({
  selector: '[brmasker]',
})
export class BrmaskerDirective {
  @Input() brmasker: any;
  @HostListener('keyup', ['$event'])
  inputChanged(event: any): void {
    if (event.target.value) {
      event.target.value = this.onInput(event.target.value);
    }
  }
  constructor() {
  }
  private onInput(value: any): void {
    const ret = this.formataCampo(value, this.brmasker.mask, this.brmasker.len);
    return ret;
  }
  private formataCampo(campo: string, Mascara: string, tamanho: number): any {
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\R|\$|\&|\%| /g;
    const campoSoNumeros = campo.toString().replace( exp, '' );
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara  = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') || (Mascara.charAt(i) === 'R'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }

}
