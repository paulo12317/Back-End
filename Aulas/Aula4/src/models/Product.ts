import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Product")
export class Product{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string;

    @Column({ type: "int", nullable: false })
    price!: number;

    @Column({ type: "text" })
    description!: string;

    constructor(name:string,price:number,description:string){
        this.name = name;
        this.price = price;
        this.description = description;
    }
}