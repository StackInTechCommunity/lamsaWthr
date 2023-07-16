import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preferredTemperatureUnit: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
