import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Data } from 'src/datas/entities/data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {

	constructor( 
	@InjectRepository(Project)
	private projectRepo: Repository<Project>,
	@InjectRepository(Data)
	private dataRepo: Repository<Data>)
	{

	}

	async create(data: any) {
		var project = new Project();

		project.name = data.name;
		project.owner_id = data.owner_id;
		project.path = data.path;

		project = await this.projectRepo.save(project);
	}

	async get(id: number) {
		var project = await this.projectRepo.findOne({where: {id: id}});

		return (project);
	}
	findAll() {

	}

	findOne(id: number) {
	return `This action returns a #${id} project`;
	}

	async update(data: any) {
		var projo = await this.projectRepo.findOne({where: {id: data.id}});
		if (data.name !== undefined)
			projo.name = data.name;
		if (data.status !== undefined)
			projo.status = data.status;
		return await this.projectRepo.save(projo);
	}

	remove(id: number) {
	return `This action removes a #${id} project`;
	}
}
