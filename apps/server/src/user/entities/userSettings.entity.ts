import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
export enum UNIT {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit',
}
@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UNIT,
    default: UNIT.CELSIUS,
  })
  preferredUnit: string;
}
