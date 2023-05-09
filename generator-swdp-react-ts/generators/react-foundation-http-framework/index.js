"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class HttpRequestFramework extends Generator {
    requestFile = ['axios.ts'];
    constructor(args, opts) {
        super(args, opts);
    }
    writing() {
        this._copyHttpRequestFile();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyHttpRequestFile() {
        const allRequestFile = [...this.requestFile];
        allRequestFile.forEach(file => {
            const destinationPath = `./src/libs/${file}`;
            this._copyTpl(file, destinationPath);
        });
    }
}
exports.default = HttpRequestFramework;
//# sourceMappingURL=index.js.map