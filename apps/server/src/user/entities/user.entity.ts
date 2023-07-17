import { City } from '../../weather/entities/city.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserSettings } from './userSettings.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => City)
  @JoinTable()
  cities: City[];

  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings: UserSettings;
}
