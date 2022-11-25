import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { HoraireInfirmierDto } from './dto/horaire-infirmier.dto';
import { HoraireInfirmierMapperService } from './horaire-infirmier-mapper.service';
import { HoraireInfirmierService } from './horaire-infirmier.service';

@Controller('horaire-infirmier')
export class HoraireInfirmierController {
  constructor(
    private readonly service: HoraireInfirmierService,
    private readonly mapper: HoraireInfirmierMapperService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: HoraireInfirmierDto })
  async create(@Body() dto: HoraireInfirmierDto): Promise<HoraireInfirmierDto> {
    return this.mapper.entityToDto(await this.service.create(this.mapper.dtoToEntity(dto)));
  }

  @Get()
  async findAll(): Promise<HoraireInfirmierDto[]> {
    return this.mapper.entitiesToDtos(await this.service.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HoraireInfirmierDto> {
    return this.mapper.entityToDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiBody({ type: HoraireInfirmierDto })
  async update(@Param('id') id: string, @Body() dto: HoraireInfirmierDto): Promise<HoraireInfirmierDto> {
    return this.mapper.entityToDto(await this.service.update(id, this.mapper.dtoToEntity(dto)));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(id);
  }
}
