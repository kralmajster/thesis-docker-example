import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Car {

    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    brand: string;

    @Column()
    make: string;

    @Column()
    category: string;

}
