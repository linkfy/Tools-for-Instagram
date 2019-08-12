/// <reference types="node" />
import { ReadStream } from 'fs';
import { Repository } from '../core/repository';
import { AccountRepositoryCurrentUserResponseRootObject, AccountRepositoryLoginResponseLogged_in_user, StatusResponse } from '../responses';
import { AccountEditProfileOptions } from '../types/account.edit-profile.options';
import { AccountTwoFactorLoginOptions } from '../types/account.two-factor-login.options';
export declare class AccountRepository extends Repository {
    login(username: string, password: string): Promise<AccountRepositoryLoginResponseLogged_in_user>;
    twoFactorLogin(options: AccountTwoFactorLoginOptions): Promise<AccountRepositoryLoginResponseLogged_in_user>;
    logout(): Promise<StatusResponse>;
    create({ username, password, email, first_name }: {
        username: any;
        password: any;
        email: any;
        first_name: any;
    }): Promise<any>;
    currentUser(): Promise<import("../responses").AccountRepositoryCurrentUserResponseUser>;
    setBiography(text: string): Promise<import("../responses").AccountRepositoryCurrentUserResponseUser>;
    changeProfilePicture(stream: ReadStream): Promise<AccountRepositoryCurrentUserResponseRootObject>;
    editProfile(options: AccountEditProfileOptions): Promise<import("../responses").AccountRepositoryCurrentUserResponseUser>;
    changePassword(oldPassword: string, newPassword: string): Promise<any>;
    removeProfilePicture(): Promise<AccountRepositoryCurrentUserResponseRootObject>;
    setPrivate(): Promise<AccountRepositoryCurrentUserResponseRootObject>;
    setPublic(): Promise<AccountRepositoryCurrentUserResponseRootObject>;
    private command;
    readMsisdnHeader(usage?: string): Promise<any>;
    msisdnHeaderBootstrap(usage?: string): Promise<any>;
    contactPointPrefill(usage?: string): Promise<any>;
    getPrefillCandidates(): Promise<any>;
    processContactPointSignals(): Promise<any>;
}
