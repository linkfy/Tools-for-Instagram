/// <reference types="chance" />
import { Observable } from 'rxjs';
import { AttemptOptions } from '@lifeomic/attempt';
import { Repository } from './repository';
export declare abstract class Feed<Response = any, Item = any> extends Repository {
    attemptOptions: Partial<AttemptOptions<any>>;
    readonly items$: Observable<Item[]>;
    observable(semaphore?: () => Promise<any>, attemptOptions?: Partial<AttemptOptions<any>>): Observable<Item[]>;
    protected moreAvailable: boolean;
    protected chance: Chance.Chance;
    protected rankToken: string;
    protected abstract state: Response;
    abstract request(...args: Array<any>): Promise<Response>;
    abstract items(): Promise<Array<Item>>;
    serialize(): string;
    deserialize(data: string): void;
    toPlain(): Object;
    isMoreAvailable(): boolean;
}
