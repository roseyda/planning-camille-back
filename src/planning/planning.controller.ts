import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { PlanningDto } from './dto/planning.dto';
import { PlanningMapperService } from './planning-mapper.service';
import { PlanningService } from './planning.service';

@Controller('planning')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PlanningController {
  constructor(private readonly service: PlanningService, private readonly mapper: PlanningMapperService) {}

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @ApiBody({ type: CreatePlanningDto, isArray: true })
  // @ApiCreatedResponse({ type: PlanningDto, isArray: true })
  // async create(@Body() dtos: (CreatePlanningDto & { name: string })[]): Promise<PlanningDto[]> {
  //   return await Promise.all(
  //     dtos.map(async (dto) =>
  //       this.mapper.entityToDto(await this.service.create(this.mapper.dtoToEntity({ ...dto, horaire: dto.name })))
  //     )
  //   );
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreatePlanningDto })
  @ApiCreatedResponse({ type: PlanningDto })
  async create(@Body() dto: CreatePlanningDto): Promise<PlanningDto> {
    return this.mapper.entityToDto(await this.service.create(this.mapper.dtoToEntity(dto)));
  }

  @Get()
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: String,
  })
  @ApiOkResponse({ type: PlanningDto, isArray: true })
  async findByDate(@Query('start') start: string, @Query('end') end: string): Promise<PlanningDto[]> {
    return this.mapper.entitiesToDtos(await this.service.findByDate(start, end));
  }

  @Get(':id')
  @ApiOkResponse({ type: PlanningDto })
  async findOne(@Param('id') id: string): Promise<PlanningDto> {
    return this.mapper.entityToDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiBody({ type: PlanningDto })
  @ApiOkResponse({ type: PlanningDto })
  async update(@Param('id') id: string, @Body() dto: PlanningDto): Promise<PlanningDto> {
    return this.mapper.entityToDto(await this.service.update(id, this.mapper.dtoToEntity(dto)));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(id);
  }
}
