import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, UnauthorizedException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/app.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { randomBytes } from 'crypto';
import { UnauthorizedError } from 'socketio-jwt';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

	// @UseGuards(new AuthGuard(1))
	// @Post('create')
	// create(@Body() data: any, @Request() req) {
	// 	data.owner_id = req.user.id;
	// 	return this.projectsService.create(data);
	// }

	// @UseGuards(new AuthGuard(1))
	// @Post('save-csv')
	// @UseInterceptors(FileInterceptor('file'))
	// saveCsvFile(@UploadedFile() file: Express.Multer.File) {
	// 	console.log(file);
	// 	const filePath = `csv/${file.originalname}`;

	// 	fs.writeFileSync(filePath, file.buffer);

	// 	return { message: 'CSV file saved successfully!' };
	// }
	@UseGuards(new AuthGuard(1))
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
		const filePath = `csv/${req.user.name}_${randomBytes(24).toString("hex")}.csv`;
		fs.writeFileSync(filePath, file.buffer);
		this.projectsService.create({
			path: filePath,
			owner_id: req.user.id,
			name: file.originalname,
		});
		return { path: filePath };
	}

	@UseGuards(new AuthGuard(1))
	@Patch('update')
	@UseInterceptors(FileInterceptor('file'))
	async updateFile(@Body() body, @Request() req, @UploadedFile() file: Express.Multer.File) {

		var project = await this.projectsService.get(body.id);
		if (project == null || project.owner_id != req.user.id && req.user.role != 2)
			throw new UnauthorizedException();
		this.projectsService.update({
			id: body.id,
			name: body.name,
		});
		const filePath = project.path;
		fs.writeFileSync(filePath, file.buffer);
		return { message: 'CSV file saved successfully!' };
	}

	// @UseGuards(new AuthGuard(1))
	// @Patch('name')
	// async request(@Body() body, @Request() req) {
	// 	var project = await this.projectsService.get(body.id);
	// 	if (project == null || project.owner_id != req.user.id && req.user.role != 2)
	// 		throw new UnauthorizedException();
	// 	this.projectsService.update({
	// 		id: project.id,
	// 		name: body.name,
	// 	});
	// 	return { message: 'CSV file saved successfully!' };
	// }

	@UseGuards(new AuthGuard(1))
	@Patch('status')
	async status(@Body() body, @Request() req) {
		console.log(req.user.rights);
		var project = await this.projectsService.get(body.id);
		if (project == null || (project.owner_id != req.user.id && req.user.rights != 2))
			throw new UnauthorizedException();
		if (body.status < project.status && req.user.rights != 2)
			throw new UnauthorizedException();
		if (body.status == 2 && req.user.rights != 2)
			throw new UnauthorizedException();
		this.projectsService.update({
			id: body.id,
			status: body.status,
		});
		return { message: 'CSV file saved successfully!' };
	}
}
