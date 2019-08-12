import { Repository } from './repository';
import { DirectThreadEntity, ProfileEntity } from '../entities';
export declare class EntityFactory extends Repository {
    directThread(id: string | string[]): DirectThreadEntity;
    profile(pk: string): ProfileEntity;
}
