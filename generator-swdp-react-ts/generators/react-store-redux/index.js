"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class ReactStoreRedux extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    writing() {
        this._copyStoreFiles();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyStoreFiles() {
    }
}
exports.default = ReactStoreRedux;
//# sourceMappingURL=index.js.map