import { Prop } from '@nestjs/mongoose';

export class SchemaFeilds {
  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  createdById: string;

  @Prop()
  updatedById: string;
}
