import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { FindPlaningParams } from './dto/findPlanningParam.model';
import { PlanningDto } from './dto/planning.dto';
import { PlanningMapperService } from './planning-mapper.service';
import { PlanningService } from './planning.service';

@Controller('planning')
export class PlanningController {
  constructor(private readonly service: PlanningService, private readonly mapper: PlanningMapperService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: PlanningDto })
  async create(@Body() dto: PlanningDto): Promise<PlanningDto> {
    return this.mapper.entityToDto(await this.service.create(this.mapper.dtoToEntity(dto)));
  }

  @Get()
  async findByDate(@Query() { start, end }: FindPlaningParams): Promise<PlanningDto[]> {
    return this.mapper.entitiesToDtos(await this.service.findByDate(start, end));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlanningDto> {
    return this.mapper.entityToDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiBody({ type: PlanningDto })
  async update(@Param('id') id: string, @Body() dto: PlanningDto): Promise<PlanningDto> {
    return this.mapper.entityToDto(await this.service.update(id, this.mapper.dtoToEntity(dto)));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(id);
  }
}
