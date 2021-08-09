export class Grupo {
  constructor(
    public tipo: string,
    public label: string,
    public desc: string,
    public subtipos?: Grupo[]
  ) {}
}
