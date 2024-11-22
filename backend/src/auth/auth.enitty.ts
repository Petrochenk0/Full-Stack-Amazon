import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column()
  refreshToken!: string;
}
