import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";

@Entity("pokemon")
export class Pokemon{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    private _name: string;

    @Column({ type:'varchar', length: 100, nullable: false})
    private _tipo1: string;

    @Column({ type:'varchar', length: 100})
    private _tipo2: string;

    @Column({type: 'int', length: 2, nullable:false})
    private _level: number;

    constructor(name:string,tipo1:string,tipo2:string,level:number){
        this._name = name;
        this._tipo1 = tipo1;
        this._tipo2 = tipo2;
        this._level = level;
    }


    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter tipo1
     * @return {string}
     */
	public get tipo1(): string {
		return this._tipo1;
	}

    /**
     * Getter tipo2
     * @return {string}
     */
	public get tipo2(): string {
		return this._tipo2;
	}

    /**
     * Getter level
     * @return {number}
     */
	public get level(): number {
		return this._level;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter tipo1
     * @param {string} value
     */
	public set tipo1(value: string) {
		this._tipo1 = value;
	}

    /**
     * Setter tipo2
     * @param {string} value
     */
	public set tipo2(value: string) {
		this._tipo2 = value;
	}

    /**
     * Setter level
     * @param {number} value
     */
	public set level(value: number) {
		this._level = value;
	}

}