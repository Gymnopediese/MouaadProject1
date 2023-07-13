import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@Column()
	password: string;

	@Column({ default: 1 })
	rights: number;

	@OneToMany(() => Project, member => member.owner, { cascade: true })
	projects: Project[];
}
