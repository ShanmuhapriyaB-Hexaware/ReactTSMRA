"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class ReactBase extends Generator {
    _mraInput;
    rootFiles = ['public', 'src', '.gitignore', 'index.html', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'];
    editableFiles = ['package.json'];
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        this._mraInput = this.options.data;
    }
    writing() {
        this._copyRootFiles();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyRootFiles() {
        const allRootFiles = [...this.rootFiles, ...this.editableFiles];
        const templateInput = { project: this._mraInput };
        allRootFiles.forEach(file => {
            const destinationPath = `./${file}`;
            if (this.editableFiles.includes(file)) {
                this._copyTpl(file, destinationPath, templateInput);
            }
            else {
                this._copyTpl(file, destinationPath);
            }
        });
    }
}
exports.default = ReactBase;
//# sourceMappingURL=index.js.map