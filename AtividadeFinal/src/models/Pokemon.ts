import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";

@Entity("pokemon")
export class Pokemon{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @Column({ type:'varchar', length: 100, nullable: false})
    tipo1: string;

    @Column({ type:'varchar', length: 100})
    tipo2: string;

    @Column({type: 'int', nullable:false})
    level: number;

    constructor(name:string,tipo1:string,tipo2:string,level:number){
        this.name = name;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.level = level;
    }

}