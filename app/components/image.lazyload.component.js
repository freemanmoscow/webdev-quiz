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
var core_1 = require('@angular/core');
var LazyLoadComponent = (function () {
    function LazyLoadComponent() {
    }
    LazyLoadComponent.prototype.ngOnChanges = function () {
        this._images = [];
        if (this.questions) {
            for (var _i = 0, _a = this.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                var image = new Image();
                image.src = question.image;
                this._images.push(image);
            }
        }
    };
    LazyLoadComponent = __decorate([
        core_1.Component({
            selector: '<lazy-load>',
            inputs: ['questions'],
            host: {
                class: 'hidden'
            },
            template: "\n      <img *ngFor=\"let question of questions;\" [src]=\"question.image\" [hidden]=\"true\">\n"
        }), 
        __metadata('design:paramtypes', [])
    ], LazyLoadComponent);
    return LazyLoadComponent;
}());
exports.LazyLoadComponent = LazyLoadComponent;
//# sourceMappingURL=image.lazyload.component.js.map