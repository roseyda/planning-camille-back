import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'horaire-infirmier' })
export class HoraireInfirmier {
  _id?: string;
  @Prop()
  name: string;
  @Prop()
  color: string;
}

export const HoraireInfirmierSchema = SchemaFactory.createForClass(HoraireInfirmier);

export type HoraireInfirmierDocument = HoraireInfirmier & Document;
