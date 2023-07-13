import { Data } from "src/datas/entities/data.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("projects")
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({})
	name: string;

	@Column({default: 0})
	status: number;

	@Column({nullable: true})
	path: string;

	@Column()
	owner_id: number;

	@ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'owner_id' })
	owner: User;

	@OneToMany(() => Data, data => data.project, { cascade: true })
	datas: Data[];
}
