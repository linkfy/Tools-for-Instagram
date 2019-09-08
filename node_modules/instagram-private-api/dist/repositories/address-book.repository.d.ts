import { Repository } from '../core/repository';
import { IgAppModule } from '../types';
import { AddressBookRepositoryLinkResponseRootObject } from '../responses/address-book.repository.link.response';
import { StatusResponse } from '../responses';
export declare class AddressBookRepository extends Repository {
    link(contacts: Array<{
        phone_numbers: string[];
        email_addresses: string[];
        first_name: string;
        last_name: string;
    }>, module?: IgAppModule): Promise<AddressBookRepositoryLinkResponseRootObject>;
    acquireOwnerContacts(me: {
        phone_numbers: string[];
        email_addresses: string[];
        first_name?: string;
        last_name?: string;
    }): Promise<StatusResponse>;
}
