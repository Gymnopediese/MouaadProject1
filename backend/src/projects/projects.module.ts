import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Data } from 'src/datas/entities/data.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([Data])],
	controllers: [ProjectsController],
	providers: [ProjectsService]
})
export class ProjectsModule {}
