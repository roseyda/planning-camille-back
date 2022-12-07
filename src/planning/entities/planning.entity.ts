import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'planning' })
export class Planning {
  _id?: string;

  @Prop()
  date: Date;

  @Prop()
  horaire: string;
}

export const PlanningSchema = SchemaFactory.createForClass(Planning);

export type PlanningDocument = Planning & Document;
