import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { HoraireInfirmier, HoraireInfirmierDocument } from './entities/horaire-infirmier.entity';

@Injectable()
export class HoraireInfirmierService {
  constructor(@InjectModel('HoraireInfirmier') private readonly model: Model<HoraireInfirmierDocument>) {}

  async create(horaireInfirmier: HoraireInfirmier): Promise<HoraireInfirmier> {
    if (!horaireInfirmier) {
      throw new BadRequestException('Error: entity is undefined');
    }

    if (horaireInfirmier._id) {
      throw new BadRequestException('Error: entity id invalid');
    }

    const newModel = new this.model(horaireInfirmier);
    const entity = await newModel.save();

    return entity.toObject() as unknown as HoraireInfirmier;
  }

  async findAll(): Promise<HoraireInfirmier[]> {
    const entities = await this.model.find().exec();

    return (entities ?? []).filter(Boolean).map((entity) => entity.toObject() as unknown as HoraireInfirmier);
  }

  async findOne(id: string) {
    const entity = await this.model.findById(id).exec();
    if (!entity) {
      throw new NotFoundException('Error: entity not found!');
    }

    return entity.toObject() as unknown as HoraireInfirmier;
  }

  async update(id: string, horaireInfirmier: HoraireInfirmier) {
    if (id !== horaireInfirmier?._id) {
      throw new BadRequestException('Error: entity id invalid');
    }

    const entity = await this.model
      .findByIdAndUpdate(id, horaireInfirmier as unknown as UpdateQuery<HoraireInfirmierDocument>, {
        useFindAndModify: false,
        new: true,
      })
      .exec();

    if (!entity) {
      throw new NotFoundException('Error: entity not found!');
    }

    return entity.toObject() as unknown as HoraireInfirmier;
  }

  async remove(id: string) {
    const entity = await this.model.findByIdAndDelete(id).exec();

    if (!entity) {
      throw new NotFoundException('Error: entity not found!');
    }
  }
}
