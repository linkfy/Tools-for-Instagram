"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const class_transformer_1 = require("class-transformer");
const attempt_1 = require("@lifeomic/attempt");
const Chance = require("chance");
const errors_1 = require("../errors");
const repository_1 = require("./repository");
const decorators_1 = require("../decorators");
class Feed extends repository_1.Repository {
    constructor() {
        super(...arguments);
        this.attemptOptions = {
            delay: 60000,
            factor: 1.5,
            maxAttempts: 10,
            minDelay: 60000,
            maxDelay: 300000,
            jitter: true,
        };
        this.chance = new Chance();
        this.rankToken = this.chance.guid();
    }
    get items$() {
        return this.observable();
    }
    observable(semaphore, attemptOptions) {
        return new rxjs_1.Observable(observer => {
            let subscribed = true;
            process.nextTick(async () => {
                do {
                    try {
                        await attempt_1.retry(async () => {
                            const items = await this.items();
                            observer.next(items);
                            if (typeof semaphore === 'function') {
                                await semaphore();
                            }
                        }, Object.assign({ handleError(error, context) {
                                if (error instanceof errors_1.IgResponseError &&
                                    [400, 429, 500, 502].includes(error.response.statusCode) &&
                                    subscribed) {
                                    return;
                                }
                                else {
                                    context.abort();
                                }
                            } }, (attemptOptions || this.attemptOptions)));
                    }
                    catch (e) {
                        observer.error(e);
                    }
                } while (this.isMoreAvailable() && subscribed);
                observer.complete();
            });
            return function unsubscribe() {
                subscribed = false;
            };
        });
    }
    serialize() {
        return class_transformer_1.serialize(this, { strategy: 'excludeAll' });
    }
    deserialize(data) {
        class_transformer_1.plainToClassFromExist(this, JSON.parse(data));
    }
    toPlain() {
        return class_transformer_1.classToPlain(this, { strategy: 'excludeAll' });
    }
    isMoreAvailable() {
        return !!this.moreAvailable;
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], Feed.prototype, "moreAvailable", void 0);
__decorate([
    decorators_1.Enumerable(false),
    __metadata("design:type", Object)
], Feed.prototype, "chance", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], Feed.prototype, "rankToken", void 0);
exports.Feed = Feed;
//# sourceMappingURL=feed.js.map