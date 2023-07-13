import { Project } from "src/projects/entities/project.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("datas")
export class Data {
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryGeneratedColumn()
	project_id: number;


	@ManyToOne(() => Project, project => project.datas, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'project_id'})
	project: Project;

}
