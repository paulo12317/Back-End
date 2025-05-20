export class Produto{
    constructor(public preco:number,public id:number, public nome:string){}
}

export let produtos: Produto[] = []