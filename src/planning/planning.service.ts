import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Planning, PlanningDocument } from './entities/planning.entity';

@Injectable()
export class PlanningService {
  constructor(@InjectModel('Planning') private readonly model: Model<PlanningDocument>) {}

  async create(planning: Planning): Promise<Planning> {
    if (!planning) {
      throw new BadRequestException('Error: entity is undefined');
    }

    if (planning._id) {
      throw new BadRequestException('Error: entity id invalid');
    }

    const newModel = new this.model(planning);
    const entity = await newModel.save();

    return entity.toObject() as unknown as Planning;
  }

  async findAll(): Promise<Planning[]> {
    const entities = await this.model.find().exec();

    return (entities ?? []).filter(Boolean).map((entity) => entity.toObject() as unknown as Planning);
  }

  async findByDate(start: string, end: string): Promise<Planning[]> {
    if (!start && !end) {
      return this.findAll();
    }

    const startDate = start && new Date(start);
    const endDate = end && new Date(end);
    endDate && endDate.setDate(endDate.getDate() + 1);

    const entities = await this.model
      .find({ date: { $gte: startDate, $lte: endDate } } as unknown as FilterQuery<PlanningDocument>)
      .exec();

    return (entities ?? []).filter(Boolean).map((entity) => entity.toObject() as unknown as Planning);
  }

  async findOne(id: string) {
    const entity = await this.model.findById(id).exec();
    if (!entity) {
      throw new NotFoundException('Error: entity not found!');
    }

    return entity.toObject() as unknown as Planning;
  }

  async update(id: string, planning: Planning) {
    if (id !== planning?._id) {
      throw new BadRequestException('Error: entity id invalid');
    }

    const entity = await this.model
      .findByIdAndUpdate(id, planning as unknown as UpdateQuery<PlanningDocument>, {
        useFindAndModify: false,
        new: true,
      })
      .exec();

    if (!entity) {
      throw new NotFoundException('Error: entity not found!');
    }

    return entity.toObject() as unknown as Planning;
  }

  async remove(id: string) {
    const entity = await this.model.findByIdAndDelete(id).exec();

    if (!entity) {
      throw new NotFoundException('Error: entity not found!');
    }
  }
}
